import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const supportedLanguages = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
]

void i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: {
        title: '个性签名生成器',
        subtitle: '无需登录，输入文字即可生成手写风格签名，并导出为图片。',
        language: '界面语言',
        inputLabel: '签名内容',
        placeholder: '请输入想要生成的签名文字',
        fontFamily: '字体',
        fontSize: '字号',
        fontColor: '字体颜色',
        backgroundColor: '背景颜色',
        transparentBackground: '使用透明背景',
        transparentHint: '启用透明背景后，背景颜色与纹理将被禁用。',
        blackImageHint: '如果打开图片后是纯黑色，可能是预览器背景为黑色，放到浅色底即可。',
        texture: '纹理',
        textureNone: '无纹理',
        texturePaper: '宣纸',
        textureDots: '网点',
        textureLines: '斜线',
        previewTitle: '即时预览',
        download: '导出图片',
        downloadSvg: '导出SVG',
        reset: '重置设置',
        exportHint: '背景透明时，把图片粘贴到 Word 里即可浮于文字上方。',
        textRequired: '请至少输入一个字符',
        generating: '生成中...',
        textureHint: '纹理仅用于预览和PNG导出，SVG将忽略纹理。',
      },
    },
    en: {
      translation: {
        title: 'Signature Designer',
        subtitle: 'Craft a handwriting-like signature and export it as an image—no login required.',
        language: 'Language',
        inputLabel: 'Signature text',
        placeholder: 'Type the text you want to convert into a signature',
        fontFamily: 'Font family',
        fontSize: 'Font size',
        fontColor: 'Font color',
        backgroundColor: 'Background color',
        transparentBackground: 'Use transparent background',
        transparentHint: 'Transparent mode disables background fill and textures.',
        blackImageHint: 'If the PNG looks black, the viewer likely has a dark background—place it over a light layer to verify.',
        texture: 'Texture',
        textureNone: 'None',
        texturePaper: 'Rice paper',
        textureDots: 'Dots',
        textureLines: 'Diagonal lines',
        previewTitle: 'Live preview',
        download: 'Export image',
        downloadSvg: 'Export SVG',
        reset: 'Reset',
        exportHint: 'With a transparent background the image can float above text in Word.',
        textRequired: 'Please enter at least one character',
        generating: 'Generating...',
        textureHint: 'Textures affect preview/PNG only; SVG export is flat.',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n


