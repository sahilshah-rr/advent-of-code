require './src/day-03/triangle.rb'

puts File
  .read('./src/day-03/input.txt').strip.split("\n")
  .map { |l| l.split(' ').map(&:to_i) }
  .map { |sides| Triangle.new(*sides) }
  .count(&:valid?)
