# 🌍 Multilanguage Support for heemusic 🎶

## 🌟 How to Add a New Language

1. 📁 Create a new file in the `locales` directory with the name of the language in the format `language_code.json`. For example, `EnglishUS.json` for English, `SpanishES.json` for Spanish, etc.
2. 📋 Copy the contents of the `EnglishUS.json` file into the new file.
3. 🌐 Translate the strings in the new file to the desired language.


### 📚 Available Translations

- [x] English (US) - `EnglishUS.json` (Default)
- [x] Hindi - `Hindi.json` [by @oniichanx](https://github.com/oniichanx) (Ai Translation - Not Accurate)
- [x] Spanish (ES) - `SpanishES.json` [by @oniichanx](https://github.com/oniichanx)
- [x] Portuguese (PT) - `PortuguesePT.json` [by @oniichanx](https://github.com/oniichanx)
- [x] Polish - `Polish.json` [by @InfNibor](https://github.com/infnibor) and [by @oniichanx](https://github.com/oniichanx)
- [x] French - `French.json` [by @oniichanx](https://github.com/oniichanx)
- [x] German - `German.json` [by @oniichanx](https://github.com/oniichanx)
- [x] Russian - `Russian.json` [by @oniichanx](https://github.com/oniichanx)
- [x] Korean - `Korean.json` [by @hwangsihu](https://github.com/hwangsihu)
- [ ] Indonesian - `Indonesian.json` (Not Started)
- [ ] English (GB) - `EnglishGB.json` (Not Started)
- [ ] Bulgarian - `Bulgarian.json` (Not Started)
- [x] Chinese (CN) - `ChineseCN.json` [by @oniichanx](https://github.com/oniichanx) (Ai Translation - Not Accurate)
- [ ] Chinese (TW) - `ChineseTW.json` (Not Started)
- [ ] Croatian - `Croatian.json` (Not Started)
- [ ] Czech - `Czech.json` (Not Started)
- [ ] Danish - `Danish.json` (Not Started)
- [ ] Dutch - `Dutch.json` (Not Started)
- [ ] Finnish - `Finnish.json` (Not Started)
- [ ] Greek - `Greek.json` (Not Started)
- [ ] Hungarian - `Hungarian.json` (Not Started)
- [ ] Italian - `Italian.json` (Not Started)
- [x] Japanese - `Japanese.json` [by @hatry4](https://github.com/hatry4)
- [ ] Lithuanian - `Lithuanian.json` (Not Started)
- [x] Norwegian - `Norwegian.json` [by @oniichanx](https://github.com/oniichanx) (Ai Translation - Not Accurate)
- [ ] Portuguese (BR) - `PortugueseBR.json` (Not Started)
- [ ] Romanian - `Romanian.json` (Not Started)
- [ ] Swedish - `Swedish.json` (Not Started)
- [ ] Thai - `Thai.json` (Not Started)
- [ ] Turkish - `Turkish.json` (Not Started)
- [ ] Ukrainian - `Ukrainian.json` (Not Started)
- [x] Vietnamese - `Vietnamese.json` [by @nhutlamm](https://github.com/nhutlamm) (Ai Translation - Not Accurate)


## 📚 How to Use the Translations

1. 📁 Create a new file in the `locales` directory with the name of the language in the format `language_code.json`. For example, `EnglishUS.json` for English, `SpanishES.json` for Spanish, etc.

2. 📋 Copy the contents of the `EnglishUS.json` file into the new file.

3. 🌐 Translate the strings in the new file to the desired language.


## Have a language to contribute? 🎉
- Fork the repository.
- Add the translation file in the `locales` directory.
- Create a pull request with the changes.

## 📝 Translation Guidelines

- **Do not** change the key names in the translation JSON file.
- **Do not** change the structure of the translation JSON file.
- **Do not** remove the `{}` tags from the strings.
- **Do not** add any new keys to the translation JSON file.
- **Do not** add any new directories to the repository.



## 📝 Translation JSON Structure

The translation JSON file should be structured as follows:

```json
{
	"category": {
		"command": {
			"description": "Description of the command.",
			"content": "Command content.",
			"key": "value"
		}
	}
}
```
### Example Translation JSON

**EnglishUS:**
```json
{
	"cmd": {
		"ping": {
			"description": "Shows the bot's ping.",
			"content": "Pinging...",
			"bot_latency": "Bot Latency",
			"api_latency": "API Latency",
			"requested_by": "Requested by {author}"
		}
	}
}
```

**Hindi:**
```json
{
	"cmd": {
		"ping": {
			"description": "बॉट का पिंग दिखाता है।",
			"content": "पिंगिंग...",
			"bot_latency": "पिंगिंग...",
			"api_latency": "एपीआई लेटेंसी",
			"requested_by": "{author} द्वारा अनुरोधित"
		}
	}
}
```

### Formatting Tags for i18n NPM
To ensure `{}` are not removed during translations, use the format tags: `["{", "}"]`.


## 📚 Resources
- [i18n NPM](https://www.npmjs.com/package/i18n)
- [Discord Developer Portal - Locales](https://discord.com/developers/docs/reference#locales)
