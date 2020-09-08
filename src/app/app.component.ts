import { Component, OnInit } from '@angular/core';
import { altCapify, spaceify, clapify, emojify, l33t1fy, smashify, L33t1fySubstitution } from 'meme-type-npm';

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
  value: L33t1fySubstitution;
}

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
  public fitzpatrickScaleModifiers = ['', '🏻', '🏼', '🏽', '🏾', '🏿'];

  /**
   * options for the conversion type dropdown
   */
  public conversionOptions: ConversionOption[] = [
    {
      label: 'CLAPS 👏 AND 👏 ALL 👏 CAPS',
      converter: clapify,
    },
    {
      label: 'aLtErNaTiNg cApItAlIzAtIoN',
      converter: altCapify,
    },
    {
      label: 'student 🎒 athlete 🏊‍♀️ mode (rise and grind) 😤😤😤',
      converter: emojify,
    },
    {
      label: 'l33t',
      converter: l33t1fy,
    },
    {
      label: 'keysmash',
      converter: smashify,
    },
    {
      label: 's p a c e d   o u t',
      converter: spaceify,
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
