function Note(data) {
  this.title = data.title;
  this.body = data.body;

  if (data.id) {
    this.timestamp = data.timestamp;
    this.id = data.id;
  }
  else {
    var ts = new Date();
    this.timestamp = ts.toLocaleString();
    this.id = ts.getTime();
  }
}

Note.prototype.update = function(title, body) {
  this.title = title;
  this.body = body;
  this.timestamp = new Date().toLocaleString();
};

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

  var storedData = localStorage.getItem(manager.key) || "{}";
  var parsedData = JSON.parse(storedData);

  $.each(parsedData, function(_, data) {
    var note = new Note(data);
    manager.notes[note.id] = note;
  });

  if (id) {
    return manager.notes[id];
  }
  else {
    return $.map(manager.notes, function(note) {
      return note;
    });
  }
};

NotesManager.prototype.delete = function(id) {
  var manager = this;

  if (id) {
    delete manager.notes[id];
    manager.save();
  }
};
