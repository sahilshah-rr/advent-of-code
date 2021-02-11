require 'digest'

door_id = File.read('./src/day-05/input.txt').strip
password = '########'
found = 0
salt = 0
while found < 8 do
  digest = Digest::MD5.hexdigest(door_id + salt.to_s)
  if digest.start_with?('00000')
    pos = digest[5].ord - 48
    if pos >=0 && pos < 8 && password[pos] == '#'
      password[pos] = digest[6]
      found += 1
    end
  end
  salt += 1
end
puts password
