import a01 from 'assets/images/1.png';
import a02 from 'assets/images/2.png';
import a03 from 'assets/images/3.png';
import a04 from 'assets/images/4.png';
import a05 from 'assets/images/5.png';
import a06 from 'assets/images/6.png';
import a07 from 'assets/images/7.png';
import a08 from 'assets/images/8.png';
import a09 from 'assets/images/9.png';
import a10 from 'assets/images/10.png';
import a11 from 'assets/images/11.png';
import a12 from 'assets/images/12.png';
import { ImageInfo, Profile } from './firebase-stub.api';

const imageData: Record<string, ImageInfo[]> = {
  '/taylor-home/kitchen': [
    {
      name: 'nanV',
      addedDate: new Date('2021-01-21'),
      src: 'https://www.homestratosphere.com/wp-content/uploads/2017/09/luxury-kitchen-sept12-2017.jpg',
      hash: 'nanVpjXn6I',
      metadata: {},
    }, {
      name: 'CaIX',
      addedDate: new Date('2021-01-21'),
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/kitchen-decor-ideas-1580491833.jpg?crop=1.00xw:0.669xh;0,0.151xh&resize=640:*',
      hash: 'CaIX8L123e',
      metadata: { favourite: true },
    }, {
      name: 'l9aI',
      addedDate: new Date('2021-01-21'),
      src: 'https://cf.ltkcdn.net/interiordesign/images/orig/272719-1600x1066-kitchen-design-themes-ideas.jpg',
      hash: 'l9aILAxWdA',
      metadata: {},
    }, {
      name: 'crFB',
      addedDate: new Date('2021-01-21'),
      src: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/udpatejoel-kelly-design-1495462826.gif',
      hash: 'crFB6bqhgl',
      metadata: { favourite: true },
    }, {
      name: 'wIFo',
      addedDate: new Date('2021-01-21'),
      src: 'https://www.laurysenkitchens.com/wp-content/uploads/2020/09/modern-lkl-2020-1-min.jpg',
      hash: 'wIFo9GNeBt',
      metadata: { favourite: true },
    }, {
      name: 'JS8A',
      addedDate: new Date('2021-01-21'),
      src: 'https://bathpluskitchen.com/wp-content/uploads/2020/11/Lockhart-Render-2-scaled-1.jpg',
      hash: 'JS8AvUB9rz',
      metadata: {},
    }, {
      name: 'YGvP',
      addedDate: new Date('2021-01-21'),
      src: 'https://www.thespruce.com/thmb/Cb-Xnfw_Mi-r5L795yULNmffb1c=/1820x1365/smart/filters:no_upscale()/exciting-small-kitchen-ideas-1821197-hero-d00f516e2fbb4dcabb076ee9685e877a.jpg',
      hash: 'YGvPEQqplP',
      metadata: {},
    }, {
      name: 'ooDk',
      addedDate: new Date('2021-01-21'),
      src: 'https://www.thespruce.com/thmb/U7HVKgtUSfy40K6nK-iPxSEA0fs=/2048x1365/filters:fill(auto,1)/best-kitchen-design-trends-4159322-hero-2c5404426e204445b3c182ecfe90ab7b.jpg',
      hash: 'ooDkr9b0vn',
      metadata: {},
    }, {
      name: '1qAp',
      addedDate: new Date('2021-01-21'),
      src: 'https://kitchensbyemmareed.co.uk/wp-content/uploads/2019/11/Cranbrook-Platinum-Main-Shot.jpg',
      hash: '1qApJVyaZq',
      metadata: { favourite: true },
    }, {
      name: '16EM',
      addedDate: new Date('2021-01-21'),
      src: 'https://media.prod.bunnings.com.au/api/public/content/efc747cea87c48e4b71f4f84b8f8832e?v=aba7a208&t=w704h408SmartCropdpr1',
      hash: '16EM4wJuAZ',
      metadata: {},
    },
  ],
  '/taylor-home/kitchen/cabinets': [
    {
      name: 'JS8A',
      addedDate: new Date(),
      src: a07,
      hash: 'JS8AvUB9rz',
      metadata: { favourite: true },
    },
    {
      name: 'YGvP',
      addedDate: new Date(),
      src: a08,
      hash: 'YGvPEQqplP',
      metadata: {},
    },
    {
      name: 'ooDk',
      addedDate: new Date(),
      src: a09,
      hash: 'ooDkr9b0vn',
      metadata: { favourite: true },
    },
    {
      name: '1qAp',
      addedDate: new Date(),
      src: a10,
      hash: '1qApJVyaZq',
      metadata: {},
    },
    {
      name: '16EM',
      addedDate: new Date(),
      src: a11,
      hash: '16EM4wJuAZ',
      metadata: {},
    },
    {
      name: 'uz0O',
      addedDate: new Date(),
      src: a12,
      hash: 'uz0OyFEupz',
      metadata: { favourite: true },
    },
    {
      name: 'f96x',
      addedDate: new Date(),
      src: a04,
      hash: 'f96xN9sQ61',
      metadata: {},
    },
    {
      name: 'KIyg',
      addedDate: new Date(),
      src: a01,
      hash: 'KIygV0C6oV',
      metadata: {},
    },
  ],
  '/taylor-home/kitchen/windows': [
    {
      name: 'l9aI',
      addedDate: new Date(),
      src: a01,
      hash: 'l9aILAxWdA',
      metadata: {},
    },
    {
      name: 'crFB',
      addedDate: new Date(),
      src: a03,
      hash: 'crFB6bqhgl',
      metadata: { favourite: true },
    },
  ],
  '/taylor-home/bathroom-1': [
    {
      name: 'f96x',
      addedDate: new Date(),
      src: a04,
      hash: 'f96xN9sQ61',
      metadata: { favourite: true },
    },
    {
      name: 'nanV',
      addedDate: new Date(),
      src: a02,
      hash: 'nanVpjXn6I',
      metadata: {},
    },
    {
      name: 'JS8A',
      addedDate: new Date(),
      src: a07,
      hash: 'JS8AvUB9rz',
      metadata: {},
    },
    {
      name: 'CaIX',
      addedDate: new Date(),
      src: a03,
      hash: 'CaIX8L123e',
      metadata: {},
    },
    {
      name: 'ooDk',
      addedDate: new Date(),
      src: a09,
      hash: 'ooDkr9b0vn',
      metadata: {},
    },
    {
      name: 'wIFo',
      addedDate: new Date(),
      src: a06,
      hash: 'wIFo9GNeBt',
      metadata: {},
    },
    {
      name: 'l9aI',
      addedDate: new Date(),
      src: a04,
      hash: 'l9aILAxWdA',
      metadata: { favourite: true },
    },
  ],
  '/taylor-home/bathroom-1/bathtubs': [
    {
      name: 'nanV',
      addedDate: new Date(),
      src: a02,
      hash: 'nanVpjXn6I',
      metadata: { favourite: true },
    },
    {
      name: 'YGvP',
      addedDate: new Date(),
      src: a08,
      hash: 'YGvPEQqplP',
      metadata: {},
    },
    {
      name: 'uz0O',
      addedDate: new Date(),
      src: a12,
      hash: 'uz0OyFEupz',
      metadata: {},
    },
    {
      name: 'f96x',
      addedDate: new Date(),
      src: a04,
      hash: 'f96xN9sQ61',
      metadata: {},
    },
    {
      name: '16EM',
      addedDate: new Date(),
      src: a11,
      hash: '16EM4wJuAZ',
      metadata: { favourite: true },
    },
    {
      name: 'uz0O',
      addedDate: new Date(),
      src: a12,
      hash: 'uz0OyFEupz',
      metadata: {},
    },
    {
      name: '16EM',
      addedDate: new Date(),
      src: a11,
      hash: '16EM4wJuAZ',
      metadata: { favourite: true },
    },
    {
      name: 'crFB',
      addedDate: new Date(),
      src: a05,
      hash: 'crFB6bqhgl',
      metadata: {},
    },
  ],
  '/taylor-home/bathroom-2': [
    {
      name: '16EM',
      addedDate: new Date(),
      src: a11,
      hash: '16EM4wJuAZ',
      metadata: {},
    },
    {
      name: 'uz0O',
      addedDate: new Date(),
      src: a12,
      hash: 'uz0OyFEupz',
      metadata: { favourite: true },
    },
    {
      name: 'f96x',
      addedDate: new Date(),
      src: a04,
      hash: 'f96xN9sQ61',
      metadata: {},
    },
  ],
  '/taylor-home/wardrobe': [
    {
      name: 'wIFo',
      addedDate: new Date(),
      src: a06,
      hash: 'wIFo9GNeBt',
      metadata: { favourite: true },
    },
  ],
};

const projectData: Profile = {
  projects: [{
    id: 'taylor-home',
    name: 'Taylor Home',
    collections: [{
      id: 'kitchen',
      name: 'Kitchen',
      subcollections: [{
        id: 'cabinets',
        name: 'Cabinets',
      }, {
        id: 'windows',
        name: 'Windows',
      }],
    }, {
      id: 'bathroom-1',
      name: 'Bathroom 1',
      subcollections: [{
        id: 'bathtubs',
        name: 'Bathtubs',
      }],
    }, {
      id: 'bathroom-2',
      name: 'Bathroom 2',
    }, {
      id: 'wardrobe',
      name: 'Wardrobe',
    }],
  }],
};

export default {
  imageData,
  projectData,
};
