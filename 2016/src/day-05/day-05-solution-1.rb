require 'digest'

door_id = File.read('./src/day-05/input.txt').strip
password = ''
salt = 0
while password.length < 8 do
  digest = Digest::MD5.hexdigest(door_id + salt.to_s)
  password.concat(digest[5]) if digest.start_with?('00000')
  salt += 1
end
puts password
