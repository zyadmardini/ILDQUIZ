import { useState, useRef, useEffect } from 'react';
import PageBackground from '@/components/layout/PageBackground';
import { CloseGrey } from '@/components/navigation';
import { getPatientConfig } from '@/data/patients';
import styles from './patient-scan-viewer.module.css';

export type PatientScanViewerProps = {
  patientId: string;
  variant: 'quiz' | 'results';
  onClose?: () => void;
};

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3.0;
const ZOOM_STEP = 0.25;

/**
 * PatientScanViewer Component
 * 
 * Generic HRCT scan viewer page with zoom controls for any patient.
 * Features:
 * - Fullscreen HRCT scan image
 * - Zoom in/out controls
 * - Drag and touch panning support
 * - Close button to return
 * 
 * @param patientId - Patient identifier (e.g., 'stephanie', 'julie')
 * @param variant - Which scan to show: 'quiz' or 'results'
 * @param onClose - Close button handler
 */
export default function PatientScanViewer({
  patientId,
  variant,
  onClose,
}: PatientScanViewerProps) {
  const config = getPatientConfig(patientId);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Use refs for drag state and positions to avoid stale closure issues
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragStartPositionRef = useRef({ x: 0, y: 0 });
  
  // Pinch-to-zoom state
  const pinchStartDistanceRef = useRef(0);
  const pinchStartZoomRef = useRef(1.0);
  const pinchCenterRef = useRef({ x: 0, y: 0 });
  const isPinchingRef = useRef(false);
  
  // Position ref to avoid stale closures in touch handlers
  const positionRef = useRef(position);
  const zoomLevelRef = useRef(zoomLevel);

  if (!config) {
    console.error(`Patient config not found for: ${patientId}`);
    return null;
  }

  const scanImage = variant === 'quiz' 
    ? config.scanImages.quiz 
    : config.scanImages.results;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
      // Reset position when zooming out to fit
      if (newZoom <= 1.0) {
        setPosition({ x: 0, y: 0 });
      } else {
        // Constrain position when zooming out
        const constrained = constrainPosition(position, newZoom);
        setPosition(constrained);
      }
      return newZoom;
    });
  };

  // Constrain position to keep image within bounds of the whole screen
  const constrainPosition = (pos: { x: number; y: number }, zoom: number): { x: number; y: number } => {
    // Don't constrain if zoom is at or below 1.0
    if (zoom <= 1.0) {
      return { x: 0, y: 0 };
    }

    if (!imageRef.current || !wrapperRef.current) {
      return pos;
    }

    const wrapper = wrapperRef.current;
    const wrapperRect = wrapper.getBoundingClientRect();
    
    // Get the actual displayed image dimensions
    const displayedWidth = wrapperRect.width * 1.0002;
    const displayedHeight = wrapperRect.height * 1.0356;
    
    // Calculate scaled dimensions after zoom
    const scaledWidth = displayedWidth * zoom;
    const scaledHeight = displayedHeight * zoom;
    
    // Calculate how much the image extends beyond its original size when zoomed
    const overflowX = (scaledWidth - displayedWidth) / 2;
    const overflowY = (scaledHeight - displayedHeight) / 2;
    
    // Allow panning up to the overflow amount in each direction
    // This keeps the zoomed image centered while allowing exploration of the entire zoomed area
    const maxX = overflowX;
    const minX = -overflowX;
    const maxY = overflowY;
    const minY = -overflowY;
    
    // Clamp the position within these bounds
    const constrainedX = Math.max(minX, Math.min(maxX, pos.x));
    const constrainedY = Math.max(minY, Math.min(maxY, pos.y));
    
    return { x: constrainedX, y: constrainedY };
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only handle left mouse button (button 0)
    if (e.button === 0 && zoomLevelRef.current > 1.0) {
      e.preventDefault();
      e.stopPropagation();
      isDraggingRef.current = true;
      setIsDragging(true);
      // Store the initial mouse position and current image position in refs
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
      dragStartPositionRef.current = {
        x: positionRef.current.x,
        y: positionRef.current.y,
      };
      // Set cursor styles
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }
  };

  // Touch and wheel handlers - REMOVED: Using native event listeners with passive: false instead

  // Update refs whenever position or zoomLevel changes
  useEffect(() => {
    positionRef.current = position;
  }, [position]);
  
  useEffect(() => {
    zoomLevelRef.current = zoomLevel;
  }, [zoomLevel]);

  // Reset position when zoom changes to 1.0 or below, or constrain when zoomed
  useEffect(() => {
    if (zoomLevel <= 1.0) {
      setPosition({ x: 0, y: 0 });
    } else {
      // Constrain position when zoom level changes
      // Use functional update to get current position
      setPosition(currentPos => {
        const constrained = constrainPosition(currentPos, zoomLevel);
        return constrained;
      });
    }
  }, [zoomLevel]);

  // Handle window resize to recalculate bounds
  useEffect(() => {
    const handleResize = () => {
      if (zoomLevel > 1.0) {
        // Reconstrain position when window is resized
        setPosition(currentPos => {
          const constrained = constrainPosition(currentPos, zoomLevel);
          return constrained;
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [zoomLevel]);

  // Global mouse event handlers for smooth dragging - set up once on mount
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && !isPinchingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        // Calculate the total movement from the initial mouse position
        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;
        // Apply the delta to the initial position
        const newX = dragStartPositionRef.current.x + deltaX;
        const newY = dragStartPositionRef.current.y + deltaY;
        
        // Apply constraint to keep image within bounds
        const constrained = constrainPosition({ x: newX, y: newY }, zoomLevelRef.current);
        setPosition(constrained);
      }
    };

    const handleGlobalMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        isDraggingRef.current = false;
        setIsDragging(false);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
    document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false });

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []); // Empty dependency array - refs are used to access current values

  // Native wheel event handler with passive: false
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (zoomLevelRef.current > 1.0 || e.deltaY !== 0) {
        e.preventDefault();
        const delta = e.deltaY;
        
        if (delta < 0) {
          // Scroll up = zoom in
          handleZoomIn();
        } else if (delta > 0) {
          // Scroll down = zoom out
          handleZoomOut();
        }
      }
    };

    wrapper.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
    };
  }, []); // Empty dependency array - refs are used to access current values

  // Native touch event handlers with passive: false for drag and pinch
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Calculate distance between two touches
    const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    // Calculate center point between two touches
    const getTouchCenter = (touch1: Touch, touch2: Touch): { x: number; y: number } => {
      return {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2,
      };
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1 && zoomLevelRef.current > 1.0) {
        // Single touch - drag
        e.preventDefault();
        isDraggingRef.current = true;
        setIsDragging(true);
        isPinchingRef.current = false;
        dragStartRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
        dragStartPositionRef.current = {
          x: positionRef.current.x,
          y: positionRef.current.y,
        };
      } else if (e.touches.length === 2) {
        // Two touches - pinch to zoom
        e.preventDefault();
        isPinchingRef.current = true;
        isDraggingRef.current = false;
        setIsDragging(false);
        
        const distance = getTouchDistance(e.touches[0], e.touches[1]);
        const center = getTouchCenter(e.touches[0], e.touches[1]);
        
        pinchStartDistanceRef.current = distance;
        pinchStartZoomRef.current = zoomLevelRef.current;
        pinchCenterRef.current = center;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPinchingRef.current && e.touches.length === 2) {
        // Pinch to zoom
        e.preventDefault();
        
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const scale = currentDistance / pinchStartDistanceRef.current;
        const newZoom = Math.max(
          MIN_ZOOM,
          Math.min(MAX_ZOOM, pinchStartZoomRef.current * scale)
        );
        
        // Update zoom level
        setZoomLevel(newZoom);
        
        // Adjust position to keep pinch center point fixed
        if (wrapper && imageRef.current) {
          const currentCenter = getTouchCenter(e.touches[0], e.touches[1]);
          const centerDeltaX = currentCenter.x - pinchCenterRef.current.x;
          const centerDeltaY = currentCenter.y - pinchCenterRef.current.y;
          
          // Adjust position based on center movement
          setPosition(currentPos => {
            const newX = currentPos.x + centerDeltaX;
            const newY = currentPos.y + centerDeltaY;
            const constrained = constrainPosition({ x: newX, y: newY }, newZoom);
            return constrained;
          });
        }
      } else if (isDraggingRef.current && zoomLevelRef.current > 1.0 && e.touches.length === 1) {
        // Single touch drag
        e.preventDefault();
        const deltaX = e.touches[0].clientX - dragStartRef.current.x;
        const deltaY = e.touches[0].clientY - dragStartRef.current.y;
        const newX = dragStartPositionRef.current.x + deltaX;
        const newY = dragStartPositionRef.current.y + deltaY;
        const constrained = constrainPosition({ x: newX, y: newY }, zoomLevelRef.current);
        setPosition(constrained);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        // All touches ended
        isDraggingRef.current = false;
        setIsDragging(false);
        isPinchingRef.current = false;
      } else if (e.touches.length === 1 && isPinchingRef.current) {
        // One touch ended during pinch - switch to drag if zoomed
        isPinchingRef.current = false;
        if (zoomLevelRef.current > 1.0) {
          isDraggingRef.current = true;
          setIsDragging(true);
          dragStartRef.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
          };
          dragStartPositionRef.current = {
            x: positionRef.current.x,
            y: positionRef.current.y,
          };
        }
      }
    };

    // Add native event listeners with passive: false
    wrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
    wrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: false });
    wrapper.addEventListener('touchcancel', handleTouchEnd, { passive: false });

    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchmove', handleTouchMove);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      wrapper.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []); // Empty dependency array - refs are used to access current values

  return (
    <div 
      className={styles.pageFrame}
      role="main"
      aria-label={`${config.name} HRCT scan viewer`}
    >
      {/* Background - Always first (z-index: 0) */}
      <PageBackground />

      {/* Top Grey Bar */}
      <div className={styles.topBar} />

      {/* Close Button - Top Right */}
      <div className={styles.closeButtonContainer}>
        <CloseGrey 
          className={styles.closeButton}
          onClick={handleClose}
        />
      </div>

      {/* Zoom Controls - Top */}
      <div className={styles.zoomControls}>
        <button
          className={styles.zoomButton}
          onClick={handleZoomOut}
          type="button"
          aria-label="Zoom out"
          disabled={zoomLevel <= MIN_ZOOM}
        >
          <p className={styles.zoomText}>
            <span className={styles.zoomLabel}>ZOOM OUT </span>
            <span className={styles.zoomSymbol}>-</span>
          </p>
        </button>
        <button
          className={styles.zoomButton}
          onClick={handleZoomIn}
          type="button"
          aria-label="Zoom in"
          disabled={zoomLevel >= MAX_ZOOM}
        >
          <p className={styles.zoomText}>
            <span className={styles.zoomLabel}>ZOOM IN </span>
            <span className={styles.zoomSymbol}>+</span>
          </p>
        </button>
      </div>

      {/* Scan Image Container */}
      <div className={styles.scanContainer}>
        <div 
          ref={wrapperRef}
          className={styles.scanImageWrapper}
          onMouseDown={handleMouseDown}
          style={{
            cursor: isDragging ? 'grabbing' : zoomLevel > 1.0 ? 'grab' : 'default',
          }}
        >
          <img
            ref={imageRef}
            src={scanImage}
            alt={`${config.name}'s HRCT scan - fullscreen view`}
            className={styles.scanImage}
            draggable={false}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: (isDragging || isPinchingRef.current) ? 'none' : 'transform 0.1s ease-out',
            }}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

