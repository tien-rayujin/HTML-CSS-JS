# Webform

- input type image, rendered image like button can used to submit current mouse
  click coordiantes on image it self, return X and Y coordinate on image

- input type file, accept constraint file type inputted, multiple to allow
  select multiple file at the same time

## Common attribute

- autofocus: false - specific element auto focus when page load
- disbled: false
- name, value, form

## Date

- All date and time controls can be constrained using the min and max attribute,
  or furthermore step attribute

## Select box with value option

- option'value attribute in an select form will be send as the value of
  selection, if omited, the content will be sent
- select box can go with multiple and size attribute to perform multiple
  selection and constraints selectionn size

## Autocomplete box

- using `<datalist>` given id attribute and `<option>`
- In case of old browser version, the datalist goes with select can receive the
  same results

## Useful UI widget

- `<meter>` and `<progress>`

- `<meter>`: min and max define range, low and high define prepered part

  - (min, low) define 'lower part'
  - [low, high] define 'medium part'
  - (high, low) define 'higher part'
  - `optinum`: define prepered part:
    - if(optinum in lower part)
      - lower range: preferred part = green color
      - medium range: average part = yellow color
      - higher range; wrost part = red color

- `<progress>`: change overtime up to maximum value `max`
