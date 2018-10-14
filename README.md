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
archive.createGroup("Test");
const facade = createArchiveFacade(archive);

// Change group title
facade.groups.find(group => group.title === "Test").title = "New Title";

// Add new entry
const entryFacade = createEntryFacade();
entryFacade.fields.find(item.field === "title").value = "New Entry";
entryFacade.fields.find(item.field === "username").value = "user@site.com";
entryFacade.fields.find(item.field === "password").value = "passw0rd";
facade.entries.push(entryFacade);

// Write changes back to archive
consumeArchiveFacade(archive, facade);
```
