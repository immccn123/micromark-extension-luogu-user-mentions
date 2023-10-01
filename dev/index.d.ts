export { luoguUserMentions } from "./lib/syntax.js";
export { luoguUserMentionsHTML } from "./lib/html.js";

declare module "micromark-util-types" {
  interface TokenTypeMap {
    luoguUserMentions: "luoguUserMentions";
    luoguUserMentionsGetUid: "luoguUserMentionsGetUid";
    luoguUserMentionsUid: "luoguUserMentionsUid";
    luoguUserMentionsLinkGetUsername: "luoguUserMentionsLinkGetUsername";
    luoguUserMentionsLinkUsername: "luoguUserMentionsLinkUsername";
    luoguUserMentionsLink: "luoguUserMentionsLink";
    luoguUserMentionsLinkTarget: "luoguUserMentionsLinkTarget";
  }
}
