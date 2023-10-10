require('total4');
require('total4/flow');

Flow.on('load', function(instance, meta) {

	console.log('Loaded FlowStream:', meta.name);

	if (instance.$client)
		instance.$client.destroy();

	var editable = process.argv.includes('--edit') || process.argv.includes('edit') || process.argv.includes('debug');

	editable && WEBSOCKETCLIENT(function(client) {
		instance.$client = client;
		var socket = 'wss://flow.totaljs.com/{0}/'.format(GUID());
		client.connect(socket);
		FlowStream.client('timer', client);
		console.log('Link to designer:', 'https://flow.totaljs.com?socket=' + encodeURIComponent(socket));
	});

});

Flow.on('save', function(data) {
	F.Fs.writeFile(PATH.flowstreams(data.id + '.flow'), JSON.stringify(data, null, '\t'), ERROR('FlowStream.save'));
});

Flow.init();