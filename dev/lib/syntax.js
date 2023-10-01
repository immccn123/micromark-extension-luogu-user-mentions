/**
 * @typedef {import('micromark-util-types').Extension} Extension
 * @typedef {import('micromark-util-types').State} State
 * @typedef {import('micromark-util-types').TokenizeContext} TokenizeContext
 * @typedef {import('micromark-util-types').Tokenizer} Tokenizer
 */

import { codes } from 'micromark-util-symbol'

const luoguUserMentionsConstruct = { name: 'luoguUserMentions', tokenize: luoguUserMentionsTokenize }

/**
 * @returns {Extension}
 */
export const luoguUserMentions = () => {
  return {
    text: {
      [codes.atSign]: luoguUserMentionsConstruct
    }
  }
}

/**
 * @this {TokenizeContext}
 * @type {Tokenizer}
 */
function luoguUserMentionsTokenize(effects, ok, nok) {
  const self = this

  return start

  /** @type { State }  */
  function start(code) {
    if (code === codes.atSign) {
      effects.enter('luoguUserMentions')
      effects.consume(code)
      return beginLinkLabel
    }

    return nok(code)
  }

  /** @type { State }  */
  function beginLinkLabel(code) {
    if (code !== codes.leftSquareBracket)
      return nok(code)
    effects.consume(code)
    effects.enter('luoguUserMentionsLink')
    effects.enter('luoguUserMentionsLinkGetUsername')
    effects.enter('luoguUserMentionsLinkUsername', { contentType: 'string' })
    return insideLinkLabel
  }

  /** @type { State }  */
  function insideLinkLabel(code) {
    if (code === codes.rightSquareBracket) {
      effects.exit('luoguUserMentionsLinkUsername')
      effects.exit('luoguUserMentionsLinkGetUsername')
      effects.consume(code)
      return linkContentBegin
    }
    if (
      code &&
      (code >= codes.uppercaseA && code <= codes.uppercaseZ
        || code >= codes.lowercaseA && code <= codes.lowercaseZ
        || code >= codes.digit0 && code <= codes.digit9
        || code === codes.underscore
        || code >= 128 /* Unicode */)
      && (code !== codes.byteOrderMarker && code !== codes.replacementCharacter)
    ) {
      effects.consume(code)
      return insideLinkLabel
    }
    return nok(code)
  }

  /** @type { State }  */
  function linkContentBegin(code) {
    if (code !== codes.leftParenthesis) return nok(code)
    effects.enter('luoguUserMentionsLinkTarget')
    effects.consume(code)
    return linkContentSlash
  }

  /** @type { State }  */
  function linkContentSlash(code) {
    if (code !== codes.slash) return nok(code);
    effects.consume(code)
    return linkContent
  }

  // /space/show?uid=(number)
  // /user/(number)
  /** @type { State }  */
  function linkContent(code) {
    if (code === codes.lowercaseS) {
      effects.consume(code)
      return oldUrlStage1
    }
    if (code === codes.lowercaseU) {
      effects.consume(code)
      return newUrl
    }
    return nok(code)
  }

  /** @type { State }  */
  function oldUrlStage1(code) {
    const prev = self.previous
    if (
      (prev === codes.lowercaseS && code === codes.lowercaseP) ||
      (prev === codes.lowercaseP && code === codes.lowercaseA) ||
      (prev === codes.lowercaseA && code === codes.lowercaseC) ||
      (prev === codes.lowercaseC && code === codes.lowercaseE)
    ) {
      effects.consume(code);
      return oldUrlStage1;
    }

    if (prev === codes.lowercaseE && code === codes.slash) {
      effects.consume(code);
      return oldUrlStage2;
    }

    return nok(code);
  }

  /** @type { State }  */
  function oldUrlStage2(code) {
    const prev = self.previous
    if (
      (prev === codes.slash && code === codes.lowercaseS) ||
      (prev === codes.lowercaseS && code === codes.lowercaseH) ||
      (prev === codes.lowercaseH && code === codes.lowercaseO) ||
      (prev === codes.lowercaseO && code === codes.lowercaseW) ||
      (prev === codes.lowercaseW && code === codes.questionMark) ||
      (prev === codes.questionMark && code === codes.lowercaseU) ||
      (prev === codes.lowercaseU && code === codes.lowercaseI) ||
      (prev === codes.lowercaseI && code === codes.lowercaseD)
    ) {
      effects.consume(code)
      return oldUrlStage2
    }

    if (prev === codes.lowercaseD && code === codes.equalsTo) {
      effects.consume(code)
      effects.enter('luoguUserMentionsGetUid')
      effects.enter('luoguUserMentionsUid', { contentType: 'string' })
      return linkContentUid
    }
    return nok(code)
  }

  /** @type { State }  */
  function newUrl(code) {
    const prev = self.previous;
    if (
      (prev === codes.lowercaseU && code === codes.lowercaseS) ||
      (prev === codes.lowercaseS && code === codes.lowercaseE) ||
      (prev === codes.lowercaseE && code === codes.lowercaseR)
    ) {
      effects.consume(code);
      return newUrl;
    }
    if (prev === codes.lowercaseR && code === codes.slash) {
      effects.consume(code);
      effects.enter('luoguUserMentionsGetUid')
      effects.enter('luoguUserMentionsUid', { contentType: 'string' });
      return linkContentUid;
    }
    return nok(code);
  }

  /** @type { State }  */
  function linkContentUid(code) {
    if (code && code >= codes.digit0 && code <= codes.digit9) {
      effects.consume(code)
      return linkContentUid
    }
    if (code === codes.rightParenthesis) {
      effects.exit('luoguUserMentionsUid')
      effects.exit('luoguUserMentionsGetUid')
      effects.exit('luoguUserMentionsLinkTarget')
      effects.exit('luoguUserMentionsLink')
      effects.exit('luoguUserMentions')
      effects.consume(code)
      return ok(code)
    }
    return nok(code)
  }
}
