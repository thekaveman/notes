function Note(title, body) {
  this.title = title;
  this.body = body;

  var ts = new Date();
  this.timestamp = ts.toLocaleString();
  this.id = ts.getTime();
}

function NotesManager() {
  this.key = "notes";
  this.notes = {};
  this.updateEvent = "notes:save";
}

NotesManager.prototype.save = function(note) {
  var manager = this;

  if (note) {
    manager.notes[note.id] = note;
  }

  var data = JSON.stringify(manager.notes);
  localStorage.setItem(manager.key, data);

  $(document).trigger(manager.updateEvent);
};

NotesManager.prototype.load = function(id) {
  var manager = this;

  var data = localStorage.getItem(manager.key) || "{}";
  manager.notes = JSON.parse(data);

  if (id) {
    return manager.notes[id];
  }
  else {
    var notes = [];

    Object.keys(manager.notes).forEach(function(id) {
      var note = manager.notes[id];
      notes.push(note);
    });

    return notes;
  }
};

NotesManager.prototype.delete = function(id) {
  var manager = this;

  if (id) {
    delete manager.notes[id];
    manager.save();
  }
};
