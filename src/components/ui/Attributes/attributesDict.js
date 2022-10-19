import BooleanAttribute from "./BooleanAttribute"
import TextAttribute from "./TextAttribute"

const attributesComponents = {
  integer: TextAttribute,
  string: TextAttribute,
  checkbox: BooleanAttribute,
  date: TextAttribute,
  multiLine: TextAttribute,
}

export default attributesComponents