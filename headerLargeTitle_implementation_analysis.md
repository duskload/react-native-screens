# HeaderLargeTitle Implementation Analysis

This document outlines where and how the `headerLargeTitle` functionality is implemented in the native code of the react-native-screens library.

## Overview

The `headerLargeTitle` functionality enables iOS-style large navigation titles that can collapse on scroll. This feature is iOS-specific and is not available on Android.

## Implementation Locations

### 1. TypeScript Interface Definition
**File**: `src/native-stack/types.tsx` (lines 248-250)
```typescript
/**
 * Boolean to set native property to prefer large title header (like in iOS setting).
 * For large title to collapse on scroll, the content of the screen should be wrapped in a scrollable view such as `ScrollView` or `FlatList`.
 * If the scrollable area doesn't fill the screen, the large title won't collapse on scroll.
 * Only supported on iOS.
 *
 * @platform ios
 */
headerLargeTitle?: boolean;
```

### 2. React Native Component Layer
**File**: `src/native-stack/views/HeaderConfig.tsx` (line 129)
```typescript
largeTitle={headerLargeTitle}
```

The `HeaderConfig` component receives the `headerLargeTitle` prop and passes it as `largeTitle` to the native component.

### 3. Native Component Bridge
**File**: `src/components/ScreenStackHeaderConfig.tsx`
The component uses `ScreenStackHeaderConfigNativeComponent` which bridges to the native implementation.

### 4. iOS Native Implementation

#### Header File
**File**: `ios/RNSScreenStackHeaderConfig.h` (line 46)
```objc
@property (nonatomic) BOOL largeTitle;
```

#### Implementation File
**File**: `ios/RNSScreenStackHeaderConfig.mm`

**Property Export** (line 1076):
```objc
RCT_EXPORT_VIEW_PROPERTY(largeTitle, BOOL)
```

**Core Implementation** (lines 539-542):
```objc
if (config.largeTitle) {
  navctr.navigationBar.prefersLargeTitles = YES;
}
navitem.largeTitleDisplayMode =
    config.largeTitle ? UINavigationItemLargeTitleDisplayModeAlways : UINavigationItemLargeTitleDisplayModeNever;
```

#### Key Native iOS Properties Used:
1. `navigationBar.prefersLargeTitles = YES` - Enables large titles for the navigation controller
2. `largeTitleDisplayMode` - Controls whether the specific navigation item shows large titles:
   - `UINavigationItemLargeTitleDisplayModeAlways` when `largeTitle` is true
   - `UINavigationItemLargeTitleDisplayModeNever` when `largeTitle` is false

### 5. Android Implementation
**File**: `android/src/main/java/com/swmansion/rnscreens/ScreenStackHeaderConfigViewManager.kt` (lines 255-261)

```kotlin
override fun setLargeTitle(
    view: ScreenStackHeaderConfig?,
    value: Boolean,
) {
    logNotAvailable("largeTitle")
}
```

The Android implementation simply logs that the feature is not available, confirming this is iOS-only functionality.

## Related Properties

The implementation also includes several related large title properties:

1. **`headerLargeTitleStyle`** - Styling for large titles (font, color, etc.)
2. **`headerLargeTitleHideShadow`** - Controls shadow visibility
3. **`largeTitleFontFamily`** - Font family for large titles
4. **`largeTitleFontSize`** - Font size for large titles
5. **`largeTitleFontWeight`** - Font weight for large titles
6. **`largeTitleColor`** - Text color for large titles
7. **`largeTitleBackgroundColor`** - Background color for large titles

## Usage Flow

1. Developer sets `headerLargeTitle: true` in screen options
2. React Native passes this to `HeaderConfig` component
3. `HeaderConfig` passes `largeTitle={headerLargeTitle}` to native component
4. iOS native code receives the prop via `RCT_EXPORT_VIEW_PROPERTY`
5. Native implementation sets:
   - `navigationBar.prefersLargeTitles = YES` on the navigation controller
   - `largeTitleDisplayMode = UINavigationItemLargeTitleDisplayModeAlways` on the navigation item

## Platform Support

- **iOS**: ✅ Fully implemented using native `UINavigationController` large title APIs
- **Android**: ❌ Not supported (logs "not available" message)
- **Web**: ❌ Not applicable
- **Windows**: ❌ Not applicable

## Key Files Summary

| File | Purpose |
|------|---------|
| `src/native-stack/types.tsx` | TypeScript interface definition |
| `src/native-stack/views/HeaderConfig.tsx` | React component that passes props to native |
| `ios/RNSScreenStackHeaderConfig.h` | iOS native property declaration |
| `ios/RNSScreenStackHeaderConfig.mm` | iOS native implementation |
| `android/.../ScreenStackHeaderConfigViewManager.kt` | Android stub implementation |