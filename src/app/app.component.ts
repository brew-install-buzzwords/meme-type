import { Component, OnInit } from '@angular/core';
import * as Emoji from 'node-emoji';
import * as randomEmoji from 'random-emoji';

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
  /** data model */
  public model: ModelInterface;
  /** results */
  public result;

  /**
   * options for the conversion type dropdown
   */
  public conversionOptions: ConversionOption[] = [
    {
      label: 'CLAPS 👏 AND 👏 ALL 👏 CAPS',
      converter: this.clapify,
    },
    {
      label: 'aLtErNaTiNg cApItAlIzAtIoN',
      converter: this.altCapify,
    },
    {
      label: 'student 🎸💣 athlete  mode 😉🆎💰 (rise  and 🍩 grind) ',
      converter: this.emojify,
    },
    {
      label: 'l33t',
      converter: this.l33t1fy,
    },
    {
      label: 'keysmash',
      converter: this.smashify,
    },
    {
      label: 's p a c e d   o u t',
      converter: this.spaceify,
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
  }

  /**
   * Transforms text to be all caps with clap emojis between each word
   * @param text the text to be transformed
   * @returns the text with clap emojis
   */
  public clapify(text: string): string {
    const arr: string[] = text?.toUpperCase()
                               .split(/(\s+)/)
                               .filter( e => e.trim().length > 0 );

    return arr?.length ? arr.join(' 👏 ') : '';
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
   * Inserts emojis into text
   * @param text the source text
   * @returns the text with emojis
   */
  public emojify(text: string): string {
    const textArr = text.split(/(\s+)/).filter( e => e.trim().length > 0 );

    const newTextArr = [];
    textArr.forEach(x => {
      newTextArr.push(x);
      const emojiTag = `:${x.replace(/[^a-zA-Z ]/g, '')}:`
      if (emojiTag !== '::') {
        newTextArr.push(emojiTag);
      }
    });

    return Emoji.emojify(newTextArr.join(' '), () => {
      const emojiCount = (Math.random() * 6) - 2;
      if (emojiCount > 0) {
        const emojis = [];
        randomEmoji.random({count: emojiCount}).forEach(x => {
          emojis.push(x.character);
        });
        return emojis.join('');
      } else {
        return '';
      }
    });
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
