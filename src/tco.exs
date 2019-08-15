defmodule Main do
  def recursive() do
    recursive()
  end
end

Main.recursive()
