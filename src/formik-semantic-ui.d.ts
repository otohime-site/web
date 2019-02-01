type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

declare module 'formik-semantic-ui' {
  import { Fragment } from 'react'
  import { FormikValues, FormikConfig, FormikState } from 'formik'
  import { StrictFormProps, SemanticShorthandItem, HtmlLabelProps, FormInputProps, FormFieldProps, FormRadioProps, FormCheckboxProps, FormTextAreaProps, FormDropdownProps, FormButtonProps, DropdownItemProps, FormGroup } from 'semantic-ui-react'

  export interface FormikComponentProps {
    name: string
    id?: string
    label?: React.ReactNode
    fieldProps?: FormFieldProps
  }

  export interface InputComponentProps extends FormikComponentProps {
    inputProps?: FormInputProps
    inputRef?: (el: HTMLInputElement) => void
  }

  export interface RadioComponentProps extends FormikComponentProps {
    inputProps?: FormRadioProps
    inputRef?: (el: HTMLInputElement) => void
  }

  export interface CheckboxComponentProps extends FormikComponentProps {
    inputProps?: FormCheckboxProps
    inputRef?: (el: HTMLInputElement) => void
  }

  export interface TextAreaComponentProps extends FormikComponentProps {
    inputProps?: FormTextAreaProps
    inputRef?: (el: HTMLTextAreaElement) => void
  }

  export interface DropdownComponentProps extends FormikComponentProps {
    inputProps?: FormDropdownProps
    options?: DropdownItemProps[]
  }

  export interface DropdownSchema extends DropdownComponentProps {
    type: 'dropdown'
    value?: any
  }

  export interface TextAreaSchema extends TextAreaComponentProps {
    type: 'textarea'
    value?: any
  }

  export interface CheckboxSchema extends CheckboxComponentProps {
    type: 'checkbox'
    value?: any
  }

  export interface InputSchema extends InputComponentProps {
    type?: 'string'
    value?: any
    inputProps?: FormInputProps
  }

  export class Form<Values = FormikValues> extends React.Component<
    Omit<FormikConfig<Values>, 'component'> |
    Pick<StrictFormProps, 'className' | 'inverted' | 'size'> | {
      serverValidation?: boolean
      ignoreLoading?: boolean
      schema?: {
        [field: string] : DropdownSchema | TextAreaSchema | CheckboxSchema | InputSchema
      }
    }
    > {
    static Children: typeof Fragment
    static Group: typeof FormGroup
  }
  export class Input extends React.Component<InputComponentProps> {}
  export class Radio extends React.Component<RadioComponentProps> {}
  export class Checkbox extends React.Component<CheckboxComponentProps> {}
  export class TextArea extends React.Component<TextAreaComponentProps> {}
  export class Dropdown extends React.Component<DropdownComponentProps> {}

  class ButtonBase extends React.Component<
    Omit<FormButtonProps, 'type'>
  > {}

  export class Button extends ButtonBase {
    static Submit: typeof ButtonBase
    static Reset: typeof ButtonBase
  }
}