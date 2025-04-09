import Code from '../code';
import HighlightText from '../highlight-text';

function registry(element: 'highlight-text' | 'code') {
  switch (element) {
    case 'highlight-text':
      HighlightText.registry();
      break;
    case 'code':
      Code.registry();
      break;
    default:
      break;
  }
}

export default registry;
