

Emokit = __meteor_bootstrap__.require 'emokit-node'
EmoServer = __meteor_bootstrap__.require 'sockjs' .createServer!
Fiber = __meteor_bootstrap__.require 'fibers'
server = __meteor_bootstrap__.require 'http' .createServer!
EmoServer.installHandlers server, {prefix: '/emo'}
EmoServer.on 'connection', (conn) ->
	conn.on 'data', (msg) ->
		send = (msg) ->
			conn.write JSON.stringify msg
		data = JSON.parse msg
		switch data._
		| "init" =>
			conn.write JSON.stringify devices: Emokit.init!
		| "connect" =>
			get_data = Emokit.connect!
			if typeof get_data is \function
				id = Meteor.uuid!
				send {connected: id}
				# XXX this is kinda hacky/lame -- I would prefer it spawn a worker for each connection, but I dunno how...
				#     https://github.com/astoundlabs/node-workers
				Fiber ->
					ii = Meteor.setInterval ->
						d = get_data! <<< _id: id
						send d
					, (1000 / 130) # emokit polls at 128 Hz
					conn.on 'close' ->
						Meteor.clearTimeout ii
						Emokit.close!
					Fiber.yield!
				.run!
			else
				send {error: "connection failed"}
		| otherwisse =>
			send error: "unknown rpc cmd: "+msg

server.listen 3333, '127.0.0.1'
