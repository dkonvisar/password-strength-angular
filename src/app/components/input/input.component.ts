import { Component } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  userText = '';
  userTextLength = 0;
  textInputed = false;

  // default property value
  color = 'grey';

  // Letters checking
  letterCheck(value: string) {
    return /[a-zA-Z]+/.test(value);
  }

  // Digits checking
  digitCheck(value: string) {
    return /\d+/.test(value);
  }

  // Symbols checking
  symbolCheck(value: string) {
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+/.test(value);
  }

  // Go through the function and assign the color property
  getColor(text: string) {
    // Positive case (8 and more characters)
    if (text.length > 7) {
      // When strong strength (letters-digits-symbols) - green color
      if (
        this.letterCheck(text) &&
        this.digitCheck(text) &&
        this.symbolCheck(text)
      ) {
        return (this.color = 'green');
      }

      // When medium strength (letters-digits/letters-symbols/digits-symbols) - yellow color
      if (
        (this.letterCheck(text) && this.digitCheck(text)) ||
        (this.letterCheck(text) && this.symbolCheck(text)) ||
        (this.digitCheck(text) && this.symbolCheck(text))
      ) {
        return (this.color = 'yellow');
      }

      // When easy strength (letters/digits/symbols) - orange color 🥲
      if (
        this.letterCheck(text) ||
        this.digitCheck(text) ||
        this.symbolCheck(text)
      ) {
        return (this.color = 'orange');
      }
    }

    // Back to the default behavior - grey color
    if (text.length === 0) return (this.color = 'grey');

    // Less than 8 characters - red color
    if (text.length < 8) return (this.color = 'red');

    return this.color;
  }

  onInput(event: Event) {
    this.userText = (<HTMLInputElement>event.target).value;
    this.userTextLength = this.userText.length;
    this.textInputed = true;

    this.getColor(this.userText);
  }
}
