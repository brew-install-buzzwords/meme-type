import { Component, OnInit } from '@angular/core';
import { emojis } from '../assets/emojis';

interface ModelInterface {
  /** the text area input */
  textAreaInput: string;
  /** name of the conversion function */
  conversionFunctionName: string;
  /** conversion function options */
  options?: any;
}

interface ConversionOption {
  /** label for the conversion option */
  label: string;
  /** function to carry out the conversion */
  converter: (text: string, options?: any) => string;
}

interface SubstitutionOption {
  /** label for the substitution option */
  label: string;
  /** value for the substitution option */
  value;
}

interface L33t1fyOptions {
  /** types of l33t1fy substitutions */
  substitutionType: 'numbers' | 'big' | 'symbols' | 'homophones';
}

const numbers = {
  a: '4',
  b: '8',
  e: '3',
  i: '1',
  l: '1',
  o: '0',
  p: '9',
  s: '5',
};

const bigLetters = {
  a: '/-\\',
  b: '|3',
  d: '|)',
  g: 'C-',
  h: '/-/',
  i: '][',
  j: '_]',
  k: '|<',
  l: '|_',
  m: '/\\/\\',
  n: '/\\/',
  o: '()',
  p: '|*',
  q: '(_,)',
  t: '-|-',
  u: '|_|',
  v: '\\/',
  w: '\\\\//\\\//',
  x: '><',
  y: '\\|/',
};

const symbols = {
  a: 'ⓐ',
  b: 'β',
  c: '©',
  i: '!',
  j: ';',
  l: '￡',
  p: '?',
  r: 'Ⓡ',
  s: '$',
  t: '+',
  u: 'μ',
  z: '%',
};

const homophones = {
  a: 'aye',
  f: 'ph',
  g: 'gee',
  i: 'eye',
  o: 'oh',
  s: 'ehs',
  x: 'ecks',
  z: 's',
};

const emojifyDefaults = [
  emojis.smiling_imp,
  emojis.joy,
  emojis.sweat_drops,
  emojis['100'],
  emojis.fire,
  emojis.football,
  emojis.alarm_clock,
  emojis.sunglasses,
  emojis.triumph,
  emojis.muscle,
  emojis.walking_man,
  emojis.walking_woman,
  emojis.running_man,
  emojis.running_woman,
  emojis.pray,
  emojis.pensive,
  emojis.thinking,
  emojis.point_up_2,
  emojis.ok_hand,
  emojis.eyes,
  emojis.stuck_out_tongue_closed_eyes,
  emojis.weight_lifting_man,
  emojis.weight_lifting_woman,
  emojis.skier,
  emojis.snowboarder,
  emojis.biking_woman,
  emojis.biking_man,
  emojis.basketball,
  emojis.boxing_glove,
  emojis.moneybag,
  emojis.money_mouth_face,
];

const emojifyValues = Object.values(emojis)
                            .filter(x => x.category !== 'flags');

/**
 * AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /** app title */
  public title = 'meme-type';
  /** app title in l33t speak */
  public l33tTitle = 'm3m3-ty93';
  /** the currently displayed app title */
  public displayedTitle = this.title;
  /** publisher name */
  public publisher = 'brew install buzzwords';
  /** publisher name in l33t speak */
  public l33tPublisher = '8r3w 1n5t411 8uzzw0rd5';
  /** the currently displayed publisher name */
  public displayedPublisher = this.publisher;
  /** data model */
  public model: ModelInterface;
  /** results */
  public result;
  /** true if the client is using ios */
  public runningOnIos: boolean;

  /** fitzpatrick modifiers for emoji skin tone */
  public fitzpatrickScaleModifiers = ['default', '🏻', '🏼', '🏽', '🏾', '🏿'];

  /**
   * options for the conversion type dropdown
   */
  public conversionOptions: ConversionOption[] = [
    {
      label: 'CLAPS 👏 AND 👏 ALL 👏 CAPS',
      converter: this.clapify.bind(this),
    },
    {
      label: 'aLtErNaTiNg cApItAlIzAtIoN',
      converter: this.altCapify.bind(this),
    },
    {
      label: 'student 🎒 athlete 🏊‍♀️ mode (rise and grind) 😤😤😤',
      converter: this.emojify.bind(this),
    },
    {
      label: 'l33t',
      converter: this.l33t1fy.bind(this),
    },
    {
      label: 'keysmash',
      converter: this.smashify.bind(this),
    },
    {
      label: 's p a c e d   o u t',
      converter: this.spaceify.bind(this),
    },
  ];

  /**
   * options for l33t substitutions
   */
  public substitutionOptions: SubstitutionOption[] = [
    {
      label: 'numbers',
      value: 'numbers',
    },
    {
      label: 'big',
      value: 'big',
    },
    {
      label: 'symbols',
      value: 'symbols',
    },
    {
      label: 'homophones',
      value: 'homophones',
    },
  ];

  /**
   * Initializes component
   */
  ngOnInit(): void {
    this.reset();
    this.runningOnIos = this.iOS();
  }

  /**
   * Determines whether user is on iOS
   * Source: https://stackoverflow.com/a/9039885
   * @returns true if user is on iOS
   */
  private iOS(): boolean {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
  }

  /**
   * Transforms text to be all caps with clap emojis between each word
   * @param text the text to be transformed
   * @returns the text with clap emojis
   */
  public clapify(text: string, options): string {
    const arr: string[] = text?.toUpperCase()
                               .split(/(\s+)/)
                               .filter( e => e.trim().length > 0 );
    const clapEmoji = this.applyFitzpatrick(emojis.clap, options?.fitzpatrick);

    return arr?.length ? arr.join(` ${clapEmoji} `) : '';
  }

  /**
   * Transforms text to have alternating capitalization
   * @param text the text to be transformed
   * @returns the text with alternating capitalization
   */
  public altCapify(text: string): string {
    const arr = text.split('');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i % 2 ? arr[i].toUpperCase() : arr[i].toLowerCase();
    }

    return arr.join('');
  }

  /**
   * Applies fitzpatrick modifier to an emoji
   * @param emoji the emoji to modify
   * @param modifier the fitzpatrick modifier
   * @returns the modified emoji character
   */
  private applyFitzpatrick(emoji, modifier): string {
    if (emoji.fitzpatrick_scale && modifier && modifier !== 'default') {
      console.log(`applying modifier ${modifier} to ${emoji}`);
      return emoji.char + modifier;
    }
    return emoji.char;
  }

  /**
   * Inserts emojis into text
   * @param text the source text
   * @returns the text with emojis
   */
  public emojify(text: string, options): string {
    const textArr = text.split(/(\s+)/).filter( e => e.trim().length > 0 );
    const newTextArr = [];

    textArr.forEach(x => {
      newTextArr.push(x);
      const searchText = x.replace(/[^a-zA-Z ]/g, '')
                          .toLowerCase();
      // first, look for exact match
      const match = emojis[searchText];
      if (match) {
        newTextArr.push(this.applyFitzpatrick(match, options?.fitzpatrick));
      } else {
        // second, look for keywords
        const filteredEmojis = emojifyValues.filter(y =>  y.keywords?.includes(searchText));
        if (filteredEmojis.length) {
          const keywordEmoji = filteredEmojis[Math.floor(Math.random() * filteredEmojis.length)];
          newTextArr.push(this.applyFitzpatrick(keywordEmoji, options?.fitzpatrick));
        } else {
          // third, randomly select among common emojis
          const emojiCount = (Math.random() * 6) - 2;
          if (emojiCount > 0) {
            const randomEmoji = emojifyDefaults[Math.floor((Math.random() * emojifyDefaults.length))];
            const randomEmojiFitzpatrick = this.applyFitzpatrick(randomEmoji, options?.fitzpatrick);
            newTextArr.push(randomEmojiFitzpatrick.repeat(emojiCount));
          }
        }
      }
    });

    return newTextArr.join(' ');
  }

  /**
   * Translates text into keyboard smashing
   * @param text the text to be translated
   * @returns the generated keysmash text
   */
  public smashify(text: string): string {
    const leftHandKeys = ['a', 's', 'd', 'f', 'g'];
    const rightHandKeys = ['h', 'j', 'k', 'l', ';'];

    const chars = [];
    const startingChars = ['a', 's', 'd', 'f'];

    let hand = leftHandKeys;
    for (let i = 0; i < text.length; i++) {
      // 75% chance to short-circtuit with common starting keys
      if (i < startingChars.length && Math.random() > 0.25) {
        chars.push(startingChars[i]);
        continue;
      }

      const c = text[i];
      if (c.trim()) {
        chars.push(hand[Math.floor(Math.random() * hand.length)]);

        if (hand === leftHandKeys) {
          hand = rightHandKeys;
        } else {
          hand = leftHandKeys;
        }
      } else {
        chars.push(c);
      }
    }

    return chars.join('');
  }

  /**
   * Translates the text into l33t sp34k
   * @param text the text to be translated
   * @param options options
   * @returns the translated text
   */
  public l33t1fy(text: string, options: L33t1fyOptions): string {
    let characterMap = {};
    let preserveCapitalization = false;

    if (!options?.substitutionType) {
      return '';
    }

    switch (options?.substitutionType) {
      case 'numbers':
        characterMap = numbers;
        break;
      case 'big':
        characterMap = bigLetters;
        break;
      case 'symbols':
        characterMap = symbols;
        break;
      case 'homophones':
        characterMap = homophones;
        preserveCapitalization = true;
        break;
    }

    const transformedText = [];
    text.split('').forEach(c => {
      // TODO: preserve capitalization for homophones
      transformedText.push(characterMap[c.toLowerCase()] || c);
    });

    return transformedText.join('');
  }

  /**
   * Text transform for spaced out text
   * @param text the text to be transformed
   * @returns the spaced out text
   */
  public spaceify(text: string): string {
    return text.split('').join(' ');
  }

  /**
   * Submits a model to generate results
   * @param submission the model to be submitted
   */
  public submit(submission: ModelInterface): void {
    const converter = this.conversionOptions.find(opt => opt.label === submission.conversionFunctionName)?.converter;
    if (converter) {
      this.result = converter(submission.textAreaInput, submission.options);
    }
  }

  /**
   * Updates model and results on form changes
   */
  public onChange(): void {
    this.clearResult();
    this.submit(this.model);
  }

  /**
   * Copies text to the clipbooard
   * @param val the text to be copied
   */
  public copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /**
   * Clears the results
   */
  public clearResult(): void {
    this.result = '';
  }

  /**
   * Resets the state to the default values
   */
  public reset(): void {
    this.model = {
      textAreaInput: '',
      conversionFunctionName: 'clapify',
      options: {},
    };
    this.clearResult();
  }

  /**
   * Monitors live update of text area input
   * @param event text area input
   */
  public textAreaInputChange(event): void {
    this.model.textAreaInput = event;
    this.submit(this.model);
  }
}
