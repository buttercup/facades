## Modules

<dl>
<dt><a href="#module_ButtercupFacades">ButtercupFacades</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#consumeArchiveFacade">consumeArchiveFacade(archive, facade)</a></dt>
<dd><p>Consume an archive facade and apply the differences to the archive
instance</p>
</dd>
<dt><a href="#consumeGroupFacade">consumeGroupFacade(group, facade)</a></dt>
<dd><p>Consume a group facade and apply the differences to a group instance</p>
</dd>
<dt><a href="#createArchiveFacade">createArchiveFacade(archive)</a> ⇒ <code><a href="#ArchiveFacade">ArchiveFacade</a></code></dt>
<dd><p>Create an archive facade from an Archive instance</p>
</dd>
<dt><a href="#createGroupFacade">createGroupFacade(group, [parentID])</a></dt>
<dd><p>Create a group facade from a Group instance</p>
</dd>
<dt><a href="#getEntriesFacades">getEntriesFacades(entryCollection, groupID)</a> ⇒ <code><a href="#EntryFacade">Array.&lt;EntryFacade&gt;</a></code></dt>
<dd><p>Convert an array of entries into an array of facades</p>
</dd>
<dt><a href="#getGroupsFacades">getGroupsFacades(groupCollection, parentID)</a> ⇒ <code><a href="#GroupFacade">Array.&lt;GroupFacade&gt;</a></code></dt>
<dd><p>Convert an array of groups into an array of facades</p>
</dd>
<dt><a href="#addExtraFieldsNonDestructive">addExtraFieldsNonDestructive(entry, fields)</a> ⇒ <code><a href="#EntryFacadeField">Array.&lt;EntryFacadeField&gt;</a></code></dt>
<dd><p>Add extra fields to a fields array that are not mentioned in a preset
Facades are creaded by presets which don&#39;t mention all property values (custom user
added items). This method adds the unmentioned items to the facade fields so that
they can be edited as well.</p>
</dd>
<dt><a href="#applyFieldDescriptor">applyFieldDescriptor(entry, descriptor)</a></dt>
<dd><p>Apply a facade field descriptor to an entry
Takes data from the descriptor and writes it to the entry.</p>
</dd>
<dt><a href="#consumeEntryFacade">consumeEntryFacade(entry, facade)</a></dt>
<dd><p>Process a modified entry facade</p>
</dd>
<dt><a href="#createEntryFacade">createEntryFacade([entry])</a> ⇒ <code><a href="#EntryFacade">EntryFacade</a></code></dt>
<dd><p>Create a data/input facade for an Entry instance</p>
</dd>
<dt><a href="#getEntryFacadeType">getEntryFacadeType(entry)</a> ⇒ <code>String</code></dt>
<dd><p>Get the facade type for an entry</p>
</dd>
<dt><a href="#setEntryValue">setEntryValue(entry, property, name, value)</a></dt>
<dd><p>Set a value on an entry</p>
</dd>
<dt><a href="#createFieldDescriptor">createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options)</a> ⇒ <code><a href="#EntryFacadeField">EntryFacadeField</a></code></dt>
<dd><p>Create a descriptor for a field to be used within a facade</p>
</dd>
<dt><del><a href="#getEntryValue">getEntryValue(entry, field, name)</a> ⇒ <code>String</code></del></dt>
<dd><p>Get a value on an entry for a specific property type</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ArchiveFacade">ArchiveFacade</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#GroupFacade">GroupFacade</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#EntryFacade">EntryFacade</a> : <code>Object</code></dt>
<dd><p>Entry facade for data input</p>
</dd>
<dt><a href="#EntryFacadeField">EntryFacadeField</a> : <code>Object</code></dt>
<dd><p>Entry facade data field</p>
</dd>
</dl>

<a name="module_ButtercupFacades"></a>

## ButtercupFacades
<a name="consumeArchiveFacade"></a>

## consumeArchiveFacade(archive, facade)
Consume an archive facade and apply the differences to the archive
instance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive instance to apply to |
| facade | [<code>ArchiveFacade</code>](#ArchiveFacade) | The facade to apply |

<a name="consumeGroupFacade"></a>

## consumeGroupFacade(group, facade)
Consume a group facade and apply the differences to a group instance

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| group | <code>Group</code> | The group instance to apply to |
| facade | [<code>GroupFacade</code>](#GroupFacade) | The facade to apply |

<a name="createArchiveFacade"></a>

## createArchiveFacade(archive) ⇒ [<code>ArchiveFacade</code>](#ArchiveFacade)
Create an archive facade from an Archive instance

**Kind**: global function  
**Returns**: [<code>ArchiveFacade</code>](#ArchiveFacade) - An archive facade  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | An archive instance |

<a name="createGroupFacade"></a>

## createGroupFacade(group, [parentID])
Create a group facade from a Group instance

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| group | <code>Group</code> |  | The group instance |
| [parentID] | <code>String</code> | <code>0</code> | The parent ID of the group |

<a name="getEntriesFacades"></a>

## getEntriesFacades(entryCollection, groupID) ⇒ [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade)
Convert an array of entries into an array of facades

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade) - An array of entry facades  

| Param | Type | Description |
| --- | --- | --- |
| entryCollection | <code>Array.&lt;Entry&gt;</code> | An array of entries |
| groupID | <code>String</code> | The parent group ID |

<a name="getGroupsFacades"></a>

## getGroupsFacades(groupCollection, parentID) ⇒ [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade)
Convert an array of groups into an array of facades

**Kind**: global function  
**Returns**: [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade) - An array of group facades  

| Param | Type | Description |
| --- | --- | --- |
| groupCollection | <code>Array.&lt;Group&gt;</code> | An array of groups |
| parentID | <code>String</code> | The parent group ID |

<a name="addExtraFieldsNonDestructive"></a>

## addExtraFieldsNonDestructive(entry, fields) ⇒ [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField)
Add extra fields to a fields array that are not mentioned in a preset
Facades are creaded by presets which don't mention all property values (custom user
added items). This method adds the unmentioned items to the facade fields so that
they can be edited as well.

**Kind**: global function  
**Returns**: [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) - A new array with all combined fields  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | An Entry instance |
| fields | [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) | An array of fields |

<a name="applyFieldDescriptor"></a>

## applyFieldDescriptor(entry, descriptor)
Apply a facade field descriptor to an entry
Takes data from the descriptor and writes it to the entry.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry to apply to |
| descriptor | [<code>EntryFacadeField</code>](#EntryFacadeField) | The descriptor object |

<a name="consumeEntryFacade"></a>

## consumeEntryFacade(entry, facade)
Process a modified entry facade

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry to apply processed data on |
| facade | [<code>EntryFacade</code>](#EntryFacade) | The facade object |

<a name="createEntryFacade"></a>

## createEntryFacade([entry]) ⇒ [<code>EntryFacade</code>](#EntryFacade)
Create a data/input facade for an Entry instance

**Kind**: global function  
**Returns**: [<code>EntryFacade</code>](#EntryFacade) - A newly created facade  

| Param | Type | Description |
| --- | --- | --- |
| [entry] | <code>Entry</code> | The Entry instance |

<a name="getEntryFacadeType"></a>

## getEntryFacadeType(entry) ⇒ <code>String</code>
Get the facade type for an entry

**Kind**: global function  
**Returns**: <code>String</code> - The facade type  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance |

<a name="setEntryValue"></a>

## setEntryValue(entry, property, name, value)
Set a value on an entry

**Kind**: global function  
**Throws**:

- <code>Error</code> Throws if the property type is not recognised


| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance |
| property | <code>String</code> | Type of property ("property"/"meta"/"attribute") |
| name | <code>String</code> | The property name |
| value | <code>String</code> | The value to set |

<a name="createFieldDescriptor"></a>

## createFieldDescriptor(entry, title, entryPropertyType, entryPropertyName, options) ⇒ [<code>EntryFacadeField</code>](#EntryFacadeField)
Create a descriptor for a field to be used within a facade

**Kind**: global function  
**Returns**: [<code>EntryFacadeField</code>](#EntryFacadeField) - The field descriptor  

| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> \| <code>null</code> | The entry instance to process or null if the initial value  should be empty |
| title | <code>String</code> | The field title |
| entryPropertyType | <code>String</code> | The type of entry property (property/attribute) |
| entryPropertyName | <code>String</code> | The name of the property |
| options | <code>Object</code> | The options for the field |

<a name="getEntryValue"></a>

## ~~getEntryValue(entry, field, name) ⇒ <code>String</code>~~
***Deprecated***

Get a value on an entry for a specific property type

**Kind**: global function  
**Returns**: <code>String</code> - The property value  
**Throws**:

- <code>Error</code> Throws for unknown property types


| Param | Type | Description |
| --- | --- | --- |
| entry | <code>Entry</code> | The entry instance |
| field | <code>String</code> | The type of entry property (property/attribute) |
| name | <code>String</code> | The property name |

<a name="ArchiveFacade"></a>

## ArchiveFacade : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The facade type: "archive" |
| id | <code>String</code> | The archive ID |
| attributes | <code>Object</code> | A key/value list of all the archive attributes |
| groups | [<code>Array.&lt;GroupFacade&gt;</code>](#GroupFacade) | An array of group facades |
| entries | [<code>Array.&lt;EntryFacade&gt;</code>](#EntryFacade) | An array of entry facades |

<a name="GroupFacade"></a>

## GroupFacade : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | The facade type: "group" |
| id | <code>String</code> \| <code>null</code> | The group ID. Will be set to null if  the group is a new one |
| title | <code>String</code> | The group title |
| attributes | <code>Object</code> | A key/value list of group attributes |
| parentID | <code>String</code> \| <code>null</code> | The parent group ID. Set to "0" if  it is to be created in the root. |

<a name="EntryFacade"></a>

## EntryFacade : <code>Object</code>
Entry facade for data input

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The entry ID |
| type | <code>String</code> | The type of the facade |
| fields | [<code>Array.&lt;EntryFacadeField&gt;</code>](#EntryFacadeField) | An array of fields |

<a name="EntryFacadeField"></a>

## EntryFacadeField : <code>Object</code>
Entry facade data field

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>String</code> | The user-friendly title of the field |
| field | <code>String</code> | The type of data to map back to on the Entry instance (property/attribute) |
| property | <code>String</code> | The property name within the field type of the Entry instance |
| value | <code>String</code> | The value of the property (read/write) |
| secret | <code>Boolean</code> | Wether or not the value should be hidden while viewing (masked) |
| multiline | <code>Boolean</code> | Whether the value should be edited as a multiline value or not |
| formatting | <code>Object</code> \| <code>Boolean</code> | Vendor formatting options object, or false if no formatting necessary |
| maxLength | <code>Number</code> | Maximum recommended length of the value (defaults to -1) |
