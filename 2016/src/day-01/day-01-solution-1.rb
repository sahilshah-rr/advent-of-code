puts File
  .read("#{__dir__}/input.txt").split(', ') # Read input
  .map { |i| [i[0] == 'R' ? -1i : +1i, i[1..-1].to_i] } # Translate instructions
  .reduce([0+0i, 0+1i]) { |(p, d), (i, s)| [p += (d *= i) * s, d] } # Move self
  .first.rect.map(&:abs).sum # Calculate distance
