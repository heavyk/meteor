
class Emo
	(@url = "http://#{document.location.hostname}:3333/emo") ->
		@s = new SockJS @url
		@s.onopen = @_onopen
		@s.onmessage = @_onmessage
		@s.onclose = @_onclose

	rpc: (fn, opts = {}) ->
		@s.send JSON.stringify opts <<< _: fn

	_onopen: ~>
		console.log "connected to emokit. determining devices..."
		@rpc "init"

	_onmessage: (msg) ~>
		d = JSON.parse msg.data
		if d.connected then console.log "connected to device #{d.connected}"
		else if d._id and Math.random! > 0.95
			amplify.publish d._id, d
		#	console.log "msg", msg.data

	_onclose: ~>
		console.log "closed connection!"

