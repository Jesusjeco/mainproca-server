const Client = require('../modules/Client');

const getAllClients = async (req, res, next) => {
  try {
    const clientsList = await Client.find({}).sort({ name: 1 });

    res.status(200).json(clientsList);
    //console.log(clientsList);
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).send('Error fetching clients');
  }
}//getAllClients

const getClientById = async (req, res, next) => {
  try {
    const clientById = await Client.findById(req.params.id);

    if (!clientById) {
      // If no client is found, send a 404 status and error message
      console.log("Error 404 detected");
      return res.status(404).json({ error: 'Client not found' });
    }

    res.status(200).json(clientById);
    //console.log(clientById);
  } catch (err) {
    console.error('Error fetching client by ID:', err);
    res.status(500).send('Error fetching client by ID');
  }
}

const createClient = async (req, res) => {
  try {// Create a new document
    //const newClient = new Client({ name: "Another Weesley333" });
    const newClient = new Client(req.body);
    // Save the document
    const savedClient = await newClient.save();

    res.status(201).send('Test client name saved successfully');
  } catch (err) {
    console.error('Error saving document:', err);
    res.status(500).send('Error saving document');
  }
}

const updateClient = async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log("Updating client: " + id);

    const clientToupdate = await Client.findByIdAndUpdate(id, req.body);
    if (!clientToupdate) {
      res.status(404).send('Document not found by ID');
    }

    const updatedClient = await Client.findById(id);
    //res.status(200).send('Client updated... I guess?');
    res.status(200).send(updatedClient);

  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).send('Error updating document');
  }
}

const deleteClient = async (req, res) => {
  const { id } = req.params;

  console.log("Borrando cliente: " + id);

  try {
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return res.status(404).send('Client not found');
    }

    res.send(`Client with ID ${id} has been deleted`);
  } catch (err) {
    console.error('Error deleting client:', err);
    res.status(500).send('Error deleting client');
  }
}

const getClientsIdsAndNames = async (req, res, next) => {
  console.log("getClientsNamesById route");
  try {
    // Extract clientIds from request body or query parameters
    const clientIds = req.body.clientIds || [];

    // Fetch clients from MongoDB using Mongoose
    const clients = await Client.find({ _id: { $in: clientIds } });

    // Check if any clients were found
    if (!clients || clients.length === 0) {
      return res.status(404).json({ error: 'Clients not found' });
    }

    // Prepare response with IDs and names
    const clientsWithIdsAndNames = clients.map(client => ({
      id: client._id,
      name: client.name
    }));

    // Send JSON response with clients' IDs and names
    res.status(200).json(clientsWithIdsAndNames);
  } catch (err) {
    console.error('Error fetching clients by IDs:', err);
    res.status(500).send('Error fetching clients by IDs');
  }
}

module.exports = {
  getAllClients, getClientById, createClient, updateClient, deleteClient, getClientsIdsAndNames
}