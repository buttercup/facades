# Facades
> Editing facades for Buttercup vaults and content

[![Build Status](https://travis-ci.org/buttercup/facades.svg?branch=master)](https://travis-ci.org/buttercup/facades) [![npm version](https://badge.fury.io/js/%40buttercup%2Ffacades.svg)](https://www.npmjs.com/package/@buttercup/facades)

## About
This library contains facade functionality used for editing and applying changes to Buttercup vaults and their contained items. Facades are object representations of Buttercup's instance-based componets like `Archive`, `Group` and `Entry`. Facades can be transferred more easily than class instances and can be consumed using this library.

## Usage
This library should be used in conjunction with [Buttercup core](https://github.com/buttercup/buttercup-core):

```shell
npm install buttercup @buttercup/facades --save
```

```javascript
const { Archive } = require("buttercup");
const { consumeArchiveFacade, createArchiveFacade, createEntryFacade } = require("@buttercup/facades");

const archive = new Archive();
const group = archive.createGroup("Test");
const facade = createArchiveFacade(archive);

// Change group title
facade.groups.find(item => item.id === group.id).title = "New Title";

// Add new entry
const entryFacade = createEntryFacade();
entryFacade.parentID = group.id;
entryFacade.fields.find(item => item.property === "title").value = "New Entry";
entryFacade.fields.find(item => item.property === "username").value = "user@site.com";
entryFacade.fields.find(item => item.property === "password").value = "passw0rd";
facade.entries.push(entryFacade);

// Write changes back to archive
consumeArchiveFacade(archive, facade);
```

You can read about the various facade properties in the [API documentation](API.md).

### Creating new objects
The `createEntryFacade` function normally takes an `Entry` instance, but can be used without one to create a _new_ entry. Once created make sure to set `parentID` to the ID of the parent group. You can override the facade type of new entries by specifying it upon creation: `createEntryFacade(null, { type: "website" })`.

You can create new groups by using `createGroupFacade` - passing no group to this method creates a new group facade. You can specify the parent group's ID (defaults to root) as the second parameter to the method. Make sure to set the `title` property before writing it back.

You can add new properties to entries by using the `createFieldDescriptor` method:

```javascript
const entryFacade = createEntryFacade(entry);
const field = createFieldDescriptor(entry, "myProp", "property", "myProp");
field.value = "some new value";
entryFacade.fields.push(field);
consumeEntryFacade(entry, entryFacade);
```

`createFieldDescriptor` has the following signature: `createFieldDescriptor(entry, title, propertyType, propertyName)`.

### Value types

Facade fields (and therefore Buttercup entry properties) can have specific value types. The default is of course text, but types such as "note", "otp" and "password" can be applied:

```javascript
const {
    FIELD_VALUE_TYPE_NOTE,
    FIELD_VALUE_TYPE_OTP,
    FIELD_VALUE_TYPE_PASSWORD,
    FIELD_VALUE_TYPE_TEXT
} = require("@buttercup/facades");

const entryFacade = createEntryFacade(entry);
const field = createFieldDescriptor(entry, "My Notes", "property", "My Notes", FIELD_VALUE_TYPE_NOTE);
field.value = "My\nmultiline\nnote!";
entryFacade.fields.push(field);
consumeEntryFacade(entry, entryFacade);
```

Value types essentially only change how the entry property is rendered whilst viewing the data.

### Important notes regarding usage
Facade consumption is inherently destructive, so be sure that when consuming facades you're applying the correct facade instance to the original class instance. Applying the wrong facade could potentially end up deleting all items (groups and entries) from the original archive instance.
