// using Manager constructor 
const Manager = require('../lib/Manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('John', 480, 'jon@email.com', 50);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('John', 480, 'jon@email.com', 50);

    expect(manager.getRole()).toEqual("Manager");
}); 