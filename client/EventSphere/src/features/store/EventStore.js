import {makeAutoObservable} from "mobx";

export default class EventStore {
    constructor () {
        this._events = []
        this._myEvents = []
        this._moderationEvents = []
        this._eventById = {}
        makeAutoObservable(this)
    }

    setEvents (event) {
        this._events = event
    }

    setModerationEvents (moderationEvents) {
        this._moderationEvents = moderationEvents
    }

    setEventById (event_id) {
        this._eventById = event_id
    }

    setMyEvents (myEvents) {
        this._myEvents = myEvents
    }

    get events () {
        return this._events
    }

    get myEvents () {
        return this._myEvents
    }
    get moderationEvents () {
        return this._moderationEvents
    }

    get eventByIdId () {
        return this._eventById
    }
}