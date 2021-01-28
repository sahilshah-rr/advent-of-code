class Triangle
  attr_reader :side_1, :side_2, :side_3

  def initialize(a, b, c)
    @side_1 = a
    @side_2 = b
    @side_3 = c
  end

  def valid?
    side_1 + side_2 > side_3 &&
      side_2 + side_3 > side_1 &&
      side_1 + side_3 > side_2
  end
end
