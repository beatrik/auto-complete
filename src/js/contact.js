function createContact(_name, _email, _address) {
    var contact = {
        name: _name,
        email: _email,
        address: _address,
        select: function() {
            //TODO: implement
        }
    };
    return contact;
}

function createContactList() {
    var contacts = [];
    contacts.push(createContact("Andrew Carlson", "andrew@g.com", "Colorado"));
    contacts.push(createContact("Stephan Morrison", "stephan@g.com", "Long Island"));
    contacts.push(createContact("William Stakes", "william.s@g.com", "Minnesota"));
    contacts.push(createContact("Anna Watson", "watson@y.com", "Connecticut"));
    return contacts;
}