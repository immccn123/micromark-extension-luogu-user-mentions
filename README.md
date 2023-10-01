# micromark-extension-luogu-user-mentions

一个 micromark 语法扩展，用来**严格匹配**诸如 `@[username](/user/{uid})` 或者 `@[username](/space/show?uid={uid})` 一类的 Mention。

[洛谷](https://www.luogu.com.cn/)社区就是这一类的 Mention。

HTML 插件不会渲染用户名的 Markdown 格式：

```markdown
@[_username_](/user/998244)
```

```html
<p><a href="https://www.luogu.com.cn/user/998244" data-uid="998244">_username_</a></p>
```

## 使用方法

参见 `example.js`。
