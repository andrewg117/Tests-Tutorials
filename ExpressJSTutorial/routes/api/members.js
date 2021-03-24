const express = require('express');
const members = require('../../Members');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// get single member
router.get('/:id', (req, res) => {

  const found = members.some(m => m.id.toString() === req.params.id);

  if (found) {
    res.json(members.filter((m) => m.id.toString() === req.params.id));

  } else {
    res.status(400).json({ message: `ID: ${req.params.id} not found` });
  }

});

// route for all members
router.get('/', (req, res) => {
  res.json(members);
});

// create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ message: 'Include name and email' });
  }

  members.push(newMember);
  res.json(members);
  // res.redirect('/');

});

// update member
router.put('/:id', (req, res) => {

  const found = members.some(m => m.id.toString() === req.params.id);

  if (found) {
    const updateMember = req.body;
    members.forEach(m => {
      if (m.id.toString() === req.params.id) {
        m.name = updateMember.name ? updateMember.name : m.name;
        m.email = updateMember.email ? updateMember.email : m.email;

        res.json({ message: 'Updated member', m });
      }
    });

  } else {
    res.status(400).json({ message: `ID: ${req.params.id} not found` });
  }

});

// delete single member
router.delete('/:id', (req, res) => {

  const found = members.some(m => m.id.toString() === req.params.id);

  if (found) {
    res.json({ 
      message: 'Member deleted', 
      members: members.filter((m) => m.id.toString() !== req.params.id) 
    });

  } else {
    res.status(400).json({ message: `ID: ${req.params.id} not found` });
  }

});

module.exports = router;