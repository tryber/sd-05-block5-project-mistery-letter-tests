const LETTER_INPUT_SELECTOR = 'input#carta-texto';
const LETTER_GENERATED_P_SELECTOR = 'p#carta-gerada';
const LETTER_GENERATED_SPANS_SELECTOR = 'p#carta-gerada>span';
const LETTER_ADD_BUTTON_SELECTOR = 'button#criar-carta';
const LETTER_COUNTER_P_SELECTOR = 'p#carta-contador';
const WORDS_SPLIT_CHARACTER = ' ';
const ALLOWED_CLASSES = [
  'newspaper',
  'magazine1',
  'magazine2',
  'medium',
  'big',
  'reallybig',
  'rotateleft',
  'rotateright',
  'skewleft',
  'skewright'
];

const checkClass = (className, properties = []) => {
  cy.document().then((doc) => {
    const e = doc.createElement('div');
    e.className = className;
    doc.body.appendChild(e);
    cy.get(`div.${className}`).should(($el) => {
      properties.map(({ key, value, match }) => {
        if (match) {
          expect($el.css(key)).to.have.string(value);
        } else {
          expect($el).to.have.css(key, value);
        }
      });
    });
  });
};

const createLetter = (content) => {
  cy.get(LETTER_ADD_BUTTON_SELECTOR).should('exist');
  cy.get(LETTER_INPUT_SELECTOR).clear();

  cy.get(LETTER_INPUT_SELECTOR).type(content);
  cy.get(LETTER_ADD_BUTTON_SELECTOR).click();
};

const checkLetterContent = (content) => {
  createLetter(content);
  const contentList = content.split(WORDS_SPLIT_CHARACTER);

  cy.get(LETTER_GENERATED_SPANS_SELECTOR).should('have.length', contentList.length);
  cy.get(LETTER_GENERATED_SPANS_SELECTOR).each(($el, index) => {
    const span = $el[0];
    expect(span.innerText.toLowerCase()).to.be.equal(contentList[index]);
    expect(ALLOWED_CLASSES).to.include.members(span.className.split(WORDS_SPLIT_CHARACTER));
  });
};

describe('Mistery letter project', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Deve haver um `input` com o `id="carta-texto"` onde o usuário poderá digitar o conteúdo da carta', () => {
    cy.get(LETTER_INPUT_SELECTOR).should('exist');
  });

  it('Deve haver um parágrafo com o `id="carta-gerada"` onde o usuário verá o resultado de sua carta misteriosa', () => {
    cy.get(LETTER_GENERATED_P_SELECTOR).should('exist');
  });

  it('Deve haver um botão com `id="criar-carta"` e ao clicar nesse botão, a carta misteriosa deve ser gerada', () => {
    const letterContent1 = 'esta é uma carta com 7 palavras';
    checkLetterContent(letterContent1);

    const letterContent2 = 'esta é uma carta com 2 palavras a mais';
    checkLetterContent(letterContent2);
  });

  it('Ao criar uma carta através do botão `id="criar-carta"`, o `input` com `id="carta-texto"` deve permanecer com o texto digitado', () => {
    const letterContent = 'esta é uma outra carta';

    cy.get(LETTER_ADD_BUTTON_SELECTOR).should('exist');

    cy.get(LETTER_INPUT_SELECTOR).type(letterContent);
    cy.get(LETTER_ADD_BUTTON_SELECTOR).click();
    cy.get(LETTER_INPUT_SELECTOR).should('have.value', letterContent);
  });

  it('Crie a classe `newspaper`', () => {
    const properties = [{
      key: 'background-color',
      value: 'rgb(250, 235, 215)'
    }, {
      key: 'font-family',
      value: 'Times New Roman',
      match: true
    }, {
      key: 'font-weight',
      value: '700'
    }];

    checkClass('newspaper', properties);
  });

  it('Crie a classe `magazine1`', () => {
    const properties = [{
      key: 'background-color',
      value: 'rgb(0, 128, 128)'
    }, {
      key: 'color',
      value: 'rgb(255, 255, 255)'
    }, {
      key: 'font-family',
      value: 'Verdana',
      match: true
    }, {
      key: 'font-weight',
      value: '900'
    }, {
      key: 'text-transform',
      value: 'uppercase'
    }];

    checkClass('magazine1', properties);
  });

  it('Crie a classe `magazine2`', () => {
    const properties = [{
      key: 'background-image',
      value: 'images/pink-pattern.png',
      match: true
    }, {
      key: 'color',
      value: 'rgb(255, 0, 255)'
    }, {
      key: 'font-family',
      value: 'Verdana',
      match: true
    }, {
      key: 'font-weight',
      value: '900'
    }];

    checkClass('magazine2', properties);
  });

  it('Crie a classe `medium`', () => {
    const properties = [{
      key: 'font-size',
      value: '20px'
    }, {
      key: 'padding',
      value: '8px'
    }];

    checkClass('medium', properties);
  });

  it('Crie a classe `big`', () => {
    const properties = [{
      key: 'font-size',
      value: '30px'
    }, {
      key: 'padding',
      value: '10px'
    }];

    checkClass('big', properties);
  });

  it('Crie a classe `reallybig`', () => {
    const properties = [{
      key: 'font-size',
      value: '40px'
    }, {
      key: 'padding',
      value: '15px'
    }];

    checkClass('reallybig', properties);
  });

  it('Crie a classe `rotateleft`', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(0.996195, -0.0871557, 0.0871557, 0.996195, 0, 0)'
    }];

    checkClass('rotateleft', properties);
  });

  it('Crie a classe `rotateright`', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(0.996195, 0.0871557, -0.0871557, 0.996195, 0, 0)'
    }];

    checkClass('rotateright', properties);
  });

  it('Crie a classe `skewleft`', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(1, 0, 0.176327, 1, 0, 0)'
    }];

    checkClass('skewleft', properties);
  });

  it('Crie a classe `skewright`', () => {
    const properties =[{
      key: 'transform',
      value: 'matrix(1, 0, -0.176327, 1, 0, 0)'
    }];

    checkClass('skewright', properties);
  });

  it('Adicione as classes de forma aleatória afim de estilizar as palavras', () => {
    const letterContent = 'essa é uma carta beeem grande com várias palavras que compõe uma carta que é beeem grande para que a possibilidade de um problema seja reduzida.';
    const first = [];
    const second = [];

    createLetter(letterContent);
    cy.get(LETTER_GENERATED_SPANS_SELECTOR).then(($el) => {
      $el.each((_index, span) => {
        const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
        expect(ALLOWED_CLASSES).to.include.members(klasses);
        first.push(...klasses);
      });
    }).then(() => {
      createLetter(letterContent);
      cy.get(LETTER_GENERATED_SPANS_SELECTOR).then(($el) => {
        $el.each((_index, span) => {
          const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
          expect(ALLOWED_CLASSES).to.include.members(klasses);
          second.push(...klasses);
        });
      });
    }).then(() => {
      expect(first).to.not.deep.equal(second);
    });
  });

  it('Com uma carta misteriosa gerada, adicione a possibilidade de alterar o estilo de uma palavra específica ao clicar nela', () => {
    const letterContent = 'esta é uma carta';
    const contentList = letterContent.split(WORDS_SPLIT_CHARACTER);

    const first = [];
    const second = [];

    createLetter(letterContent);
    const wordIndex = Math.floor(Math.random() * contentList.length) + 1;
    const wordSelector = `${LETTER_GENERATED_SPANS_SELECTOR}:nth-child(${wordIndex})`;

    cy.get(wordSelector).then(($el) => {
      const span = $el[0];
      const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
      first.push(...klasses);
    }).then(() => {
      cy.get(wordSelector).click();
      cy.get(wordSelector).then(($el) => {
        const span = $el[0];
        const klasses = span.className.split(WORDS_SPLIT_CHARACTER);
        second.push(...klasses);
      });
    }).then(() => {
      expect(first).to.not.deep.equal(second);
    });
  });

  it('Deve haver um parágrafo com o `id="carta-contador"` onde existirá um contador de palavras', () => {
    cy.get(LETTER_COUNTER_P_SELECTOR).should('exist');

    const letterContent1 = 'esta é uma carta com 7 palavras';
    const letter1Counter = letterContent1.split(WORDS_SPLIT_CHARACTER).length;
    createLetter(letterContent1);
    cy.get(LETTER_COUNTER_P_SELECTOR).should('have.text', letter1Counter.toString());

    const letterContent2 = 'esta é uma carta com 2 palavras a mais';
    const letter2Counter = letterContent2.split(WORDS_SPLIT_CHARACTER).length;
    createLetter(letterContent2);
    cy.get(LETTER_COUNTER_P_SELECTOR).should('have.text', letter2Counter.toString());
  });
});
