<p align="center"><img alt="image" src="https://github.com/studio-hysteric/react-native-essential/assets/88200574/02f74e69-9ec4-498b-a6b2-6b62b323eeca"></p>

# React Native Essential - The React Native boilerplate focuses on simplicity and stability

## Requirements

It is recommended to use [Node](https://nodejs.org/en) 18 or later.

For running in a simulator/emulator, make sure you have set up React Native by following [the official documentation](https://reactnative.dev/docs/environment-setup).

## 🚀 Quick start

Create a new project using this template by simply running the command:

```
npx react-native@latest init MyApp --template studio-hysteric/react-native-essential
```

## 🧑‍💻 Tech stack

| Library                | Version | Description                                     |
| ---------------------- | ------- | ----------------------------------------------- |
| React Native           | v0.73   | 📱 The backbone of your mobile app              |
| React                  | v18     | ⚛️ Powering UI components                       |
| TypeScript             | v5      | 🛠️ Static typechecking                          |
| React Navigation       | v6      | 🧭 Seamless navigation                          |
| Redux-toolkit          | v2      | 🗄️ Redux but less boilerplate and easy usage    |
| RN Reanimated          | v3      | 🔄 Smooth animations                            |
| RN Gesture Handler     | v2      | 👆 Simplifying complex gestures                 |
| RN MMKV                | v2      | 🗄️ Efficient key-value storage for React Native |
| RN Keyboard Controller | v1      | ⌨️ Control the keyboard like a pro              |
| i18next                | v23     | 🌐 Internationalization made simple             |
| React Hook Form + zod  | v7 + v3 | 📝 Elegant form handling with validation        |
| ky                     | v1      | 🚀 Simple yet powerful HTTP client              |
| swr                    | v2      | 🔄 React Hooks for data fetching                |
| dayjs                  | v1      | 🕰️ Lightweight alternative to Moment            |
| use-immer              | v0.9.0  | 🎨 Simplify state updates with immer            |
| FlashList              | v1      | 🚀 Performant replacement for FlatList          |

## 📄 Documentation

### Project structure

```
src
├── types
├── config
├── navigators
├── shared
│   ├── contexts
│   ├── utils
│   ├── theme
│   ├── hooks
│   ├── i18n
│   └── services
├── screens
├── libs
├── components
├── assets
├── store
└── Application.tsx
```

### Convention

- Folder name should use **Kebab case**
- Only TSX files should use **Pascal case**, while all other files should use **Camel case**.
- Prefix custom hooks with use and Higher-Order Components (HOCs) with with.

### Customization

#### Built-in Components

The boilerplate comes with some basic components to help you get started:

- **`Box`** (alternative of **`View`**)
- **`Text`**
- **`Touchable`** (alternative of **`TouchableOpacity`**)
- **`Button`** (base on **`Touchable`** above)
- **`Input`**
- **`ControlledInput`**
- **`Accordion`**
- **`IconSvg`**
- **`ScreenShell`** (wrapper for screen)

> Props and examples for this section will be updated in the future

#### Static Assets

The boilerplate includes a script to help you generate your assets quickly and easily

Run the following command:

```
yarn res
```

output:

![image](https://github.com/studio-hysteric/react-native-essential/assets/88200574/d92e3689-cd8d-49ff-a560-9ecfd808d3da)

- Usage:

```tsx
...
import R from '@/assets'

...
<IconSvg
  color={themeColors.text.primary}
  source={R.icons.ic_logo}
/>
...
```

- Write your custom asset handler

> Navigate to the script/generate-asset-resources.js file

```js
var config = {
  srcFolderName: 'src',
  assetFolderName: 'assets',
  resources: {
    images: {
      resourceFolderName: 'resources',
      exts: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif'],
      handler: imageHandler,
    },
    icons: {
      resourceFolderName: 'resources',
      exts: ['svg'],
      handler: iconHandler,
    },
  },
};
```

> The default configuration for the script is provided above, which handles images and SVG icons. You can customize this configuration by editing the existing **config** object or by modifying the asset handler function. Additionally, You can also create handling for other assets as needed.

> For example, add a handler for video assets

```js
var config = {
  srcFolderName: 'src',
  assetFolderName: 'assets',
  resources: {
    images: {
      resourceFolderName: 'resources',
      exts: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'tif'],
      handler: imageHandler,
    },
    // ...
    videos: {
      resourceFolderName: 'resources',
      exts: ['mp4', 'avi', 'mov', 'mkv', 'webm', 'm4v'],
      handler: videoHandler,
    },
  },
};

// And create the videoHandler function
function videoHandler(res) {
  let i = 0;
  // Your code for video asset handler here

  return { [res.name]: i }; // Should return like this
}
```

```js
// The res param received:
{
  name: 'videos',
  path: '/Users/xxx/Desktop/_experimental/react-native-essential/boilerplate/src/assets/videos',
  resourceFolderName: 'resources',
  exts: [ 'mp4', 'avi', 'mov', 'mkv', 'webm', 'm4v' ],
  resourcePath: '/Users/xxx/Desktop/_experimental/react-native-essential/boilerplate/src/assets/videos/resources',
  entryFilePath: '/Users/xxx/Desktop/_experimental/react-native-essential/boilerplate/src/assets/videos/index.ts',
  handler: [Function: videoHandler]
}
```

> NOTE: If you ignore exts option or leave it empty, all extensions will be accepted if the available **matchFileExt** utility function is used (please refer to the code for handling image and icon)

#### Theme

The boilerplate comes with light and dark themes pre-installed

- Usage:

```tsx
...
import {useTheme} from '@/shared/contexts/themeContext';

const Component = () => {
  const {themeColors, changeTheme, ...} = useTheme();

  return (
    ...
  )
}
```

> To add or change theme color, navigate to src/shared/theme/color.ts

> Add or change default colors by making changes to the **palettes** object

> NOTE: The first-level key of the **palettes** object is the name of the theme. The boilerplate comes with **light** and **dark** themes and automatically adapts to the current color scheme of the device. If you change the name of the theme to something different from the ones mentioned above, the default theme will be applied to the value of the first key in the **palettes** object.

#### I18n

The boilerplate comes with **vi** and **en** translations pre-configured

- Usage:

```tsx
...
import {useI18n} from '@/shared/hooks/useI18n';

const Component = () => {
  const {t, changeLanguage, ...} = useI18n();

  return <Text>{t('translation_key')}</Text>
}
```

> Or can use with the **Text**

```tsx
...

const Component = () => {
  return <Text t={'translation_key'}/>
}
```

> Add new language translations by adding a new folder and a translation.json file in src/shared/i18n/locales.

> NOTE: The exported translation should be named according to the ISO 639 Set 1 standards. You can refer to [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) for more information.

#### Environment

The boilerplate comes with **dev** and **staging** env pre-configured

> To add a new environment, create a new env file in the root folder

> For example, if you create an env.production file, you should add a type for the env key in src/types/env.d.ts if it hasn't been set
> Add the line `"start:production": "APP_ENV=production react-native start"` to the scripts section in the `package.json` file.

### 💭 Alternative

This boilerplate is where I learn and distill from the experiences of what I have done and am doing. If it doesn't meet your needs, please refer to the amazing boilerplates below:

- **[thecodingmachine/react-native-boilerplate](https://github.com/thecodingmachine/react-native-boilerplate)**

- **[obytes/react-native-template-obytes](https://github.com/obytes/react-native-template-obytes)**

- **[infinitered/ignite](https://github.com/infinitered/ignite)**
