# MMM-Notes

Module for [MagicMirror](https://github.com/MichMich/MagicMirror). Can be used for adding notes on the MagicMirror through Mycroft.

## Dependencies

```bash
mycroft-pip install sqlite3
git clone git@github.com:krukle/notes-skill.git ~/mycroft-core/skills/notes-skill
```

> **Note**
>
> Change git clone destination according to your setup.

## Installation

```bash
git clone git@github.com:krukle/MMM-Notes.git ~/MagicMirror/modules/MMM-Notes
```

## Configuration

```js
module: "MMM-Notes",
position: "top_left" //or w/e pos you want.
```

## Messages

### Emitted

| Message | About |
| ------- | ----- |
| notes-skill:get_all_posts | Sent when all posts should be sent back. |

### Received

| Message | Data | About |
| ------- | ---- | ----- |
| NEW-POST | `{post: (int:id, str:title, str:content)}` | Received when a post is created. |
| ALL-POSTS | `{posts: list((int:id, str:title, str:content))}` | Received when all posts are received. |
| DELETE-POSTS | `{}` | Received when all posts are deleted. |
| DELETE-POST | `{id: int:id}` | Received when a post with id; `id`, is deleted.
