/**
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */

/**
 * @returns {HtmlExtension}
 */
export function luoguUserMentionsHTML() {
  let username = '';

  return {
    enter: {
      luoguUserMentions() { },
      luoguUserMentionsGetUid() {
        this.buffer()
      },
      luoguUserMentionsLinkGetUsername() {
        this.buffer()
      },
    },
    exit: {
      luoguUserMentionsLinkGetUsername() {
        username = this.resume()
      },
      luoguUserMentionsGetUid() {
        var uid = this.resume()
        this.tag(`<a href="https://www.luogu.com.cn/user/${uid}" data-uid="${uid}">`)
        this.tag(username)
      },
      luoguUserMentions() {
        this.tag('</a>')
      },
    },
  };
}
