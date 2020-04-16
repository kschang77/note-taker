# Welcome to note-taker 👋
![Version](https://img.shields.io/badge/version-0.2-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> note-taker is a combination node/express server and html /javascript client to create, read, and delete simple notes

> note-taker API is a simple RESTful "database" API using node.js and express, by just using a .json file as a primitive storage engine for notes with two fields: title and text. An ID field is assigned internally.

> note-taker html/javascript client is provided and only minimally edited 

### 🏠 [Homepage](https://github.com/kschang77/note-taker)

### ✨ [Demo](https://kc-note-taker.herokuapp.com/)

### Internals

As requested, only Create, Read, and Delete functions were implemented. There is no authenticiation, and minimal error-checking. 

#### GET // get all notes

```
hosturl/api/notes
```

Simply returns all stored notes in the system, in json format.

```
[
  {
    "id": "0",
    "title": "Test Title",
    "text": "Test text"
  },
  {
    "id": "1",
    "title": "Test Title1",
    "text": "Test text1"
  },
  {
    "title": "blahblah",
    "text": "asd-0f978asdf34lk",
    "id": "4"
  }
]
```

#### POST // create new note

```
hosturl/api/notes
```
Put request should URLencoded the fields in the body in this format, with sample code in JQuery/AJAX

```
var settings = {
  "url": "localhost:8080/api/notes",
  "method": "POST",
  "timeout": 0,
  "data": {
    "title": "John Wick",
    "text": "Babbayaga"
  }
};
$.ajax(settings).done(function (response) {
  console.log(response);
});
```
The result is the same record, albeit, with a new field "id"

```
{
  "title": "John Wick",
  "text": "Babbayaga",
  "id": "5"
}
```

#### DELETE // delete note by ID

All notes have an "id" field, and to delete the note, we must pass the ID through the URL

```
hosturl/api/notes/:id
```

NOTE: This ID is not validated. If a note by that ID is there, it will be deleted. It will NOT
throw an error if there is no note by that ID. It will simply not react. 

In case of multiple notes with the same ID (due to database corruption), all notes with that ID
will be deleted. 

Response is a json message:

```
{
  "message": "If Note 5 is there, it was deleted"
}
```

## Additional Notes

### module.exports choices

Wanted to keep the declarations of the "database" modular so the natural place for it was module.exports. In the end, I chose to export 3 things

* The "table" (actually an array, as _tb_ )
* a method to WRITE the whole table to file, _writeTable_
* nextID, which is the autoinc ID field

Originally I thought about just using the size of the table (i.e. _tb.length_ as the ID), but I realized that wouldn't work due to new records and deletions. What if I added records 5 and 6, then deleted 3 and 4?  _tb.length_ would be 4, but _nextID_ should be 7. 

I chose to implement this in a hybrid way. Everytime the server is initialized, it will re-calculate a new _nextID_ based on the max ID in the _tb_  For example, if the largest ID in the table is 10, then _nextID_ will be 11. 

```
var nextID = 0;
for (i = 0; i < tableArray.length; i++) {
  if (nextID < parseInt(tableArray[i].id)) {
    nextID = parseInt(tableArray[i].id)
  }
}
nextID++;
```

The _parseInt_ is necessary because json "table" stores everything in strings, even the _id_ field. I actually forgot about this and only found the bug later, when that actually generated a nextID that is NOT the max. 

The variable _nextID_ then is kept in memory, and incremented as new records are added. A unique ID is thus generated every time it is needed. 

It is possible for _nextID_ to go back... but only after a server restart, and only if records near the "end" of the table were deleted, thus allowing their ID's to be reused.  For example, if I deleted the final records ids 15, 16, and 17, and then restarted the server, the routine above will calculate _nextID_ to be 15, assuming max ID is 14. 

###  Additional HTML routes implemented

NOTE: This may be due to the way I run localhost server instead of deploying it to heroku. 

I noticed that the html client is erroring out with odd error messages, like it could not read script.js, and looks unformated. 

I added some diagnostic messages to the server fallback and found that there were more requests falling through than first thought. 

```
 app.get("*", function (req, res) {
    console.log("html route / called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  ```

  The results include calls to script.js and styles.css, as well as other things like favicon. 

  Clearly, they are all failing, because the server has no endpoints for them. So I wrote them in:

  ```
 app.get("/assets/js/index.js", function (req, res) {
    console.log("html for index.js called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/assets/js/index.js"));
  });

  app.get("/assets/css/styles.css", function (req, res) {
    console.log("html for styles.css called ", req.originalUrl)
    res.sendFile(path.join(__dirname, "../public/assets/css/styles.css"));
  });
  ```

  And indeed, the errors stopped, and the client started working, now that it actually has some JavaScript / jQuery to run. 
  


## Author

👤 **Kasey Chang**

* Website: https://www.linkedin.com/in/kasey-chang-0932b332/
* Github: [@kschang77](https://github.com/kschang77)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_