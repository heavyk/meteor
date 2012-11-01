
class EmoClient
	(@url = "http://#{document.location.hostname}:3333/emo") ->
		@s = new SockJS @url
		@s.onopen = @_onopen
		@s.onmessage = @_onmessage
		@s.onclose = @_onclose
		# TODO: on init, list the devices here
		@devices = {}

	rpc: (fn, opts = {}) -> @s.send JSON.stringify opts <<< _: fn

	_onopen: ~>
		console.log "connected to emokit. determining devices... TODO: return a device list"
		@rpc "init"
		@rpc "connect"

	_onmessage: (msg) ~>
		d = JSON.parse msg.data
		if d.connected
			#@devices[d.connected] = {}
			amplify.publish "emo:connected", d.connected
			console.log "connected to device #{d.connected}"
		else if d._id
			amplify.publish d._id, d
		else if d.error
			amplify.publish "emo:error", d
		#	console.log "msg", msg.data

	_onclose: ~>
		console.log "closed connection!"
