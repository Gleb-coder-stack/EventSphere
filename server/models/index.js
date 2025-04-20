const {DataTypes} = require('sequelize');
const sequelize = require('../db');
const Participant = require("./Participant");
const RecallToEvent = require("./RecallToEvent");
const Event = require("./Event");
const Tag = require("./Tag");
const TagForEvent = require("./TagForEvent");
const FriendShip = require("./FriendShip");
const Organizer = require("./Organizer");
const EventsMedia = require("./EventsMedia");
const InviteToEvent = require("./InviteToEvent");
const Moderator = require("./Moderator");
const RequestToAccredited = require("./RequestToAccredited");

//Участники и события
Participant.belongsToMany(Event, {through: RecallToEvent, foreignKey: "idParticipant", otherKey: "idEvent", as: 'events', onDelete: 'CASCADE', hooks: true});
Event.belongsToMany(Participant, { through: RecallToEvent, foreignKey: "idEvent", otherKey: "idParticipant", as: 'participants'});

RecallToEvent.belongsTo(Participant, { foreignKey: "idParticipant", as: "participant" });
RecallToEvent.belongsTo(Event, { foreignKey: "idEvent", as: "event" });

//Теги и события
Tag.belongsToMany(Event, {through: TagForEvent, foreignKey: "idTag", otherKey: "idEvent", as: 'events', onDelete: 'CASCADE', hooks: true});
Event.belongsToMany(Tag, { through: TagForEvent, foreignKey: "idEvent", otherKey: "idTag", as: 'tags', onDelete: 'CASCADE', hooks: true});

TagForEvent.belongsTo(Tag, { foreignKey: "idTag", as: "tag" });
TagForEvent.belongsTo(Event, { foreignKey: "idEvent", as: "event" });

//Друзья
Participant.hasMany(FriendShip, {foreignKey: 'idRequester' , as: "requesters", onDelete: 'CASCADE', hooks: true});
Participant.hasMany(FriendShip, {foreignKey: 'idReceiver' , as: "receivers", onDelete: 'CASCADE', hooks: true});

FriendShip.belongsTo(Participant, {foreignKey: 'idRequester' , as: "requester"});
FriendShip.belongsTo(Participant, {foreignKey: 'idReceiver' , as: "receiver"});

//События и организатор
Organizer.hasMany(Event, {foreignKey: 'idOrganizer' , as: "events", onDelete: 'CASCADE', hooks: true});
Event.belongsTo(Organizer, {foreignKey: 'idOrganizer' , as: "organizer"});

//Событие и медиа
Event.hasMany(EventsMedia, {foreignKey: 'idEvent' , as: "medias"});
EventsMedia.belongsTo(Event, {foreignKey: 'idEvent' , as: "event"});

//Приглошения от друзей на события
Participant.hasMany(InviteToEvent, {foreignKey: 'idRequester' , as: "eventRequesters", onDelete: 'CASCADE', hooks: true});
Participant.hasMany(InviteToEvent, {foreignKey: 'idReceiver' , as: "eventReceivers", onDelete: 'CASCADE', hooks: true});
Event.hasMany(InviteToEvent, {foreignKey: 'idEvent' , as: "events", onDelete: 'CASCADE', hooks: true});

InviteToEvent.belongsTo(Participant, {foreignKey: 'idRequester' , as: "requester"});
InviteToEvent.belongsTo(Participant, {foreignKey: 'idReceiver' , as: "receiver"});
InviteToEvent.belongsTo(Event, {foreignKey: 'idEvent' , as: "event"});

Organizer.hasMany(RequestToAccredited, {foreignKey: 'idOrganizer', as: 'accreditations', onDelete: 'CASCADE', hooks: true});
RequestToAccredited.belongsTo(Organizer, {foreignKey: 'idOrganizer' , as: "accreditations"});

module.exports = {
    Organizer,
    Event,
    Tag,
    Participant,
    TagForEvent,
    InviteToEvent,
    FriendShip,
    RecallToEvent,
    Moderator,
    EventsMedia,
    RequestToAccredited,
}