import { adventurer } from '@dicebear/collection'
import colors from 'tailwindcss/colors'

const { red, orange, yellow, emerald, sky, violet, pink, gray, zinc } = colors

const defaultBackgroundColors = [
  ...[red[100], red[200], red[300], red[400], red[500]],
  ...[orange[100], orange[200], orange[300], orange[400], orange[500]],
  ...[yellow[100], yellow[200], yellow[300], yellow[400], yellow[500]],
  ...[emerald[100], emerald[200], emerald[300], emerald[400], emerald[500]],
  ...[sky[100], sky[200], sky[300], sky[400], sky[500]],
  ...[violet[100], violet[200], violet[300], violet[400], violet[500]],
  ...[pink[100], pink[200], pink[300], pink[400], pink[500]],
  ...[gray[100], gray[200], gray[300], gray[400], gray[500]],
  '#202020', // Just because
].map((color) => color.replace('#', ''))

export type AvatarCollection = {
  earrings: AvatarOptions
  eyebrows: AvatarOptions
  eyes: AvatarOptions
  features: AvatarOptions
  glasses: AvatarOptions
  hair: AvatarOptions
  hairColor: AvatarOptions
  mouth: AvatarOptions
  skinColor: AvatarOptions
  backgroundColor: AvatarOptions
}

export type AvatarOptions = {
  type: string
  items: {
    type: string
    enum: string[]
  }
  default: string[]
}

export type AvatarOption = keyof AvatarCollection

// This is a hack but I'm too lazy to write a proper type for this. :P
const schema = adventurer.schema.properties as any

export const collection: AvatarCollection = {
  earrings: schema.earrings,
  eyebrows: schema.eyebrows,
  eyes: schema.eyes,
  features: schema.features,
  glasses: schema.glasses,
  hair: schema.hair,
  hairColor: schema.hairColor,
  mouth: schema.mouth,
  skinColor: schema.skinColor,
  backgroundColor: {
    type: 'string',
    items: {
      type: 'string',
      enum: defaultBackgroundColors,
    },
    default: defaultBackgroundColors,
  },
}

export const options: AvatarOption[] = [
  'skinColor',
  'hair',
  'hairColor',
  'eyes',
  'mouth',
  'eyebrows',
  'glasses',
  'earrings',
  'features',
  'backgroundColor',
]

export const translationMap: Record<AvatarOption, string> = {
  earrings: 'Brincos',
  eyebrows: 'Sobrancelhas',
  eyes: 'Olhos',
  features: 'Características',
  glasses: 'Óculos',
  hair: 'Cabelo',
  hairColor: 'Cor do cabelo',
  mouth: 'Boca',
  skinColor: 'Cor da pele',
  backgroundColor: 'Cor de fundo',
}

// This is used to show the items like glasses and stuff.
export const DEFAULT_OPTIONS_FOR_ITEMS_VISIBILITY = {
  earringsProbability: 100,
  glassesProbability: 100,
  featuresProbability: 100,
}

export const SPECIAL_FEATURES: AvatarOption[] = [
  'earrings',
  'features',
  'glasses',
]

export function randomAvatar(): Record<AvatarOption, string[]> {
  return options.reduce((acc, option) => {
    const { items } = collection[option]
    const randomIndex = Math.floor(Math.random() * items.enum.length)
    return { ...acc, [option]: [items.enum[randomIndex]] }
  }, {} as Record<AvatarOption, string[]>)
}
