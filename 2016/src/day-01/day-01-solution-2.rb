require 'set'
set = Set.new([0+0i])
puts File
  .read("#{__dir__}/input.txt").strip.split(', ') # Read input
  .map { |i| [i[0] == 'R' ? -1i : +1i, i[1..-1].to_i] } # Translate instructions
  .reduce([0+0i, 0+1i]) { |(p, d), (i, s)|
    d *= i
    s.times { set.add(p += d) unless set.include?(p + d) }
    [p, d]
  } # Move self
  .first.rect.map(&:abs).sum # Calculate distance
