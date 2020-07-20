import { Component, Injectable, OnInit } from '@angular/core';
import * as Emoji from 'node-emoji';
import * as randomEmoji from 'random-emoji';

interface modelInterface {
  textAreaInput: string;
  conversionFunctionName: string;
  options?: any;
};

interface ConversionOption {
  label: string;
  converter: Function;
}

interface SubstitutionOption {
  label: string;
  value;
}

interface l33t1fyOptions {
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
}

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
}

const homophones = {
  a: 'aye',
  f: 'ph',
  g: 'gee',
  i: 'eye',
  o: 'oh',
  s: 'ehs',
  x: 'ecks',
  z: 's',
}
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{


  public title = 'meme-type';
  

  public model: modelInterface;
  public result;

  ngOnInit() {
    this.reset();
  }

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

  

  public clapify(text: string) : string {
    const arr: string[] = text?.toUpperCase()
                               .split(/(\s+)/)
                               .filter( e => e.trim().length > 0 );
  
    return arr?.length ? arr.join(' 👏 ') : '';
  }
  
  public altCapify(text: string) : string {
    let ret = '';
    const arr = text.split('');
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i % 2 ? arr[i].toUpperCase() : arr[i].toLowerCase();
    }
  
    return arr.join('');
  }
  
  public emojify(text: string) : string {
    const textArr = text.split(/(\s+)/).filter( e => e.trim().length > 0 );
  
    let newTextArr = [];
    textArr.forEach(x => {
      newTextArr.push(x);
      newTextArr.push(`:${x.replace(/[^a-zA-Z ]/g, "")}:`);
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

  public smashify(text: string): string {
    const leftHandKeys = ['a','s','d','f','g'];
    const rightHandKeys = ['h','j','k','l',';'];

    const chars = [];
    const startingChars = ['a','s','d','f'];

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
  
  public l33t1fy(text: string, options: l33t1fyOptions) : string {
    let characterMap = {};
    let preserveCapitalization = false;

    if (!options?.substitutionType) return '';
    
    switch(options?.substitutionType) {
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
    })
    
    return transformedText.join('');
  }

  public spaceify(text: string): string {
    return text.split('').join(' ');
  }

  public submit(submission: modelInterface) {
    // console.log(typeof(submission.conversionFunction));
    console.log(submission);
    const converter = this.conversionOptions.find(opt => opt.label === submission.conversionFunctionName)?.converter;
    console.log(JSON.stringify(submission?.options?.substitutionType));
    this.result = converter(submission.textAreaInput, submission.options);
  }

  public onChange() {
    this.clearResult();
    this.submit(this.model);
  }

  /* To copy any Text */
  public copyText(val: string){
    let selBox = document.createElement('textarea');
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

  public clearResult() {
    this.result = '';
  }

  public reset() {
    this.model = {
      textAreaInput: '',
      conversionFunctionName: 'clapify',
      options: {},
    };
    this.clearResult();
  }
}
