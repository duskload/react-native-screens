# HeaderLargeTitle RTL Support Implementation

This document explains how Right-to-Left (RTL) support has been implemented for the `headerLargeTitle` functionality in react-native-screens.

## Overview

The `headerLargeTitle` feature now properly supports RTL (Right-to-Left) languages such as Arabic, Hebrew, Persian, and others. When the `direction` prop is set to `'rtl'`, the large title will be properly aligned and behave correctly according to RTL layout conventions.

## Implementation Details

### 1. Native iOS Implementation

The RTL support leverages iOS's built-in `UISemanticContentAttribute` system, which automatically handles RTL layout when properly configured.

**File**: `ios/RNSScreenStackHeaderConfig.mm`

The implementation enhances the existing `applySemanticContentAttributeIfNeededToNavCtrl` method to ensure that large title elements also respect RTL direction:

```objc
// Ensure large title elements also respect RTL/LTR direction
// This applies to the large title text area and any large title related UI elements
if (@available(iOS 11.0, *)) {
  [[UILabel appearanceWhenContainedInInstancesOfClasses:@[ navCtrl.navigationBar.class ]]
      setSemanticContentAttribute:self.direction];
}
```

### 2. Key Components

#### Semantic Content Attribute Application
The RTL support is applied through the existing `applySemanticContentAttributeIfNeededToNavCtrl` method, which:

1. **Navigation Controller View**: Sets `semanticContentAttribute` on the navigation controller's view for swipe gesture direction
2. **Navigation Bar**: Applies `semanticContentAttribute` to the navigation bar and its contents
3. **UI Elements**: Applies RTL direction to buttons, views, and search bars within the navigation bar
4. **Large Title Labels**: **NEW** - Applies `semanticContentAttribute` to UILabel elements within the navigation bar (iOS 11.0+)

#### Execution Order
The RTL configuration is applied in the correct order:
1. Navigation bar is configured for RTL via `applySemanticContentAttributeIfNeededToNavCtrl`
2. Large title is enabled via `prefersLargeTitles = YES`
3. Large title display mode is set

## Usage

### Basic Usage

```typescript
// Enable large title with RTL support
<Stack.Screen
  name="MyScreen"
  component={MyComponent}
  options={{
    headerLargeTitle: true,
    direction: 'rtl',
    title: 'عنوان كبير', // Arabic title
  }}
/>
```

### Advanced Configuration

```typescript
// Full RTL configuration with styling
<Stack.Screen
  name="MyScreen"
  component={MyComponent}
  options={{
    headerLargeTitle: true,
    direction: 'rtl',
    title: 'כותרת גדולה', // Hebrew title
    headerLargeTitleStyle: {
      fontSize: 34,
      fontWeight: 'bold',
      color: '#007AFF',
    },
    headerLargeTitleHideShadow: false,
  }}
/>
```

### Stack Navigator Configuration

```typescript
// Apply RTL to entire stack
<Stack.Navigator
  screenOptions={{
    headerLargeTitle: true,
    direction: 'rtl',
    headerLargeTitleStyle: {
      fontSize: 34,
      fontWeight: 'bold',
    },
  }}
>
  <Stack.Screen name="Screen1" component={Screen1} />
  <Stack.Screen name="Screen2" component={Screen2} />
</Stack.Navigator>
```

## Behavior in RTL Mode

When `direction: 'rtl'` is set along with `headerLargeTitle: true`:

1. **Text Alignment**: Large title text is automatically aligned to the right
2. **Navigation Elements**: Back button and other navigation elements are mirrored
3. **Swipe Gestures**: Swipe-to-go-back gesture works from the right edge
4. **Scroll Behavior**: Large title collapse/expand behavior works correctly when scrolling
5. **Appearance**: All navigation bar appearance settings respect RTL direction

## Testing

A comprehensive test component has been created to verify RTL functionality:

**File**: `apps/src/tests/TestHeaderLargeTitleRTL.tsx`

This test includes:
- Large title with RTL direction
- Arabic and Hebrew text samples
- Scrollable content to test title collapse behavior
- Proper styling for RTL testing

### Running the Test

1. Add the test to your test suite
2. Run the app with RTL language settings or force RTL mode
3. Verify that:
   - Large title is right-aligned
   - Navigation elements are mirrored
   - Scroll behavior works correctly
   - Text direction is proper for RTL languages

## Platform Support

- **iOS**: ✅ Fully supported (iOS 11.0+ for large titles)
- **Android**: ❌ Not supported (large titles are iOS-only)
- **Web**: ❌ Not applicable
- **Windows**: ❌ Not applicable

## Compatibility

- **iOS Version**: Requires iOS 11.0+ for large title support
- **React Native**: Compatible with all supported versions
- **react-native-screens**: Compatible with current version

## Technical Notes

### iOS Native APIs Used

1. **`UISemanticContentAttribute`**: Controls RTL/LTR layout direction
2. **`UINavigationItemLargeTitleDisplayMode`**: Controls large title display
3. **`prefersLargeTitles`**: Enables large title support
4. **`appearanceWhenContainedInInstancesOfClasses`**: Applies RTL to specific UI elements

### Automatic Behavior

iOS automatically handles:
- Text rendering direction for RTL languages
- Layout mirroring for navigation elements
- Natural text alignment based on content
- Proper spacing and margins in RTL mode

## Troubleshooting

### Common Issues

1. **Large title not right-aligned**: Ensure `direction: 'rtl'` is set
2. **Navigation elements not mirrored**: Check that the direction is applied at the navigator level
3. **Swipe gesture not working**: Verify that the navigation controller's view has the correct semantic content attribute

### Debug Tips

1. Use iOS Simulator's "Right to Left Pseudolanguage" for testing
2. Check that `semanticContentAttribute` is properly set on navigation elements
3. Verify that the large title is enabled before applying RTL direction

## Future Enhancements

Potential improvements for future versions:

1. **Automatic RTL Detection**: Detect RTL based on device language settings
2. **Enhanced Styling**: More granular control over RTL-specific styling
3. **Animation Improvements**: Better transition animations for RTL mode
4. **Accessibility**: Enhanced accessibility support for RTL languages

## Related Files

- `ios/RNSScreenStackHeaderConfig.mm` - Main implementation
- `ios/RNSScreenStackHeaderConfig.h` - Header declarations
- `src/native-stack/types.tsx` - TypeScript interface definitions
- `src/native-stack/views/HeaderConfig.tsx` - React component integration
- `apps/src/tests/TestHeaderLargeTitleRTL.tsx` - Test component