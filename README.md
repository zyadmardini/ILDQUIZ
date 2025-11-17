# ILDQuiz Component Library

A React + TypeScript component library for the ILDQuiz application, built from Figma designs.

## Project Structure

```
ILDQuiz/
├── src/
│   ├── components/
│   │   ├── buttons/          # Button components
│   │   ├── navigation/       # Navigation components
│   │   └── SeeTheScan.tsx    # Special component
│   ├── tokens/               # Design tokens (TypeScript)
│   ├── styles/               # Global styles and CSS variables
│   └── assets/               # Images and assets
├── public/
│   └── icons/                # SVG icons
└── package.json
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Component Library

### Button Components

#### QuizzButton
Primary button for quiz selection.

```tsx
import { QuizzButton } from '@/components';

<QuizzButton 
  property1="Default"
  onClick={() => console.log('Clicked')}
>
  <p>TAKE STEPHANIE'S</p>
  <p>HRCT QUIZZ</p>
</QuizzButton>
```

#### Quizz02Button
Quiz option button with checkbox-style indicator.

```tsx
import { Quizz02Button } from '@/components';

<Quizz02Button 
  property1="Default"
  label="Honeycombing"
  onClick={() => handleSelect('honeycombing')}
/>
```

#### SeeButton
Button for viewing HRCT scans or results.

```tsx
import { SeeButton } from '@/components';

<SeeButton 
  property1="Default"
  text="SEE THE HRCT SCAN"
  onClick={() => viewScan()}
/>
```

#### PreviousGrey
Button for navigating to previous screen.

```tsx
import { PreviousGrey } from '@/components';

<PreviousGrey 
  property1="Default"
  onClick={() => goBack()}
/>
```

#### References
Button for showing references.

```tsx
import { References } from '@/components';

<References 
  property1="References Grey"
  onClick={() => showReferences()}
/>
```

### Navigation Components

#### Step
Step indicator showing current progress.

```tsx
import { Step } from '@/components';

<Step 
  currentStep={1}
  totalSteps={4}
/>
```

#### CloseGrey
Close button with icon.

```tsx
import { CloseGrey } from '@/components';

<CloseGrey 
  property1="Default"
  onClick={() => close()}
/>
```

#### ArrowLeft / ArrowRight
Arrow navigation buttons.

```tsx
import { ArrowLeft, ArrowRight } from '@/components';

<ArrowLeft 
  property1="Default"
  onClick={() => previous()}
/>

<ArrowRight 
  property1="Default"
  onClick={() => next()}
/>
```

### Other Components

#### SeeTheScan
Button with picture-in-picture icon for viewing scans.

```tsx
import { SeeTheScan } from '@/components';

<SeeTheScan 
  onClick={() => viewScan()}
/>
```

## Design Tokens

Design tokens are available in both TypeScript and CSS:

### TypeScript
```tsx
import { colors, typography, spacing } from '@/tokens';

const buttonColor = colors.accent.primary; // '#f2664f'
const fontSize = typography.fontSize.bodyLarge; // '23px'
const gap = spacing.gap.small; // '10px'
```

### CSS Variables
```css
.button {
  background-color: var(--color-accent-primary);
  font-size: var(--font-size-body-large);
  gap: var(--gap-small);
}
```

## Styling

The project uses CSS Modules for component styling. All components have corresponding `.module.css` files that use design token CSS variables.

Global styles and design tokens are imported in your main entry file:

```tsx
import './styles/global.css';
```

## Component States

Most interactive components support state variants:

- **Buttons**: `'Default' | 'Pressed'`
- **CloseGrey**: `'Default' | 'pressed'`
- **References**: `'References Grey' | 'Pressed'`

## Accessibility

All components are built with accessibility in mind:

- Semantic HTML (`<button>` elements)
- Keyboard navigation support
- Proper ARIA attributes where needed
- Focus indicators

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

