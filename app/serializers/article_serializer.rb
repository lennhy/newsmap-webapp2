class ArticleSerializer < ActiveModel::Serializer
  attributes :id, :title, :content
  has_one :user
  has_many :credits
end

# Serialization is the process
# by which we take "executable" code, in our case a Ruby object, and
# represent it as a string that can be consumed anywhere (remember, the
# Internet is just strings) and then reconstructed back into usable code.
# Remember that a Ruby object is an instance of a class,
# meaning it has been initialized and is running in memory. Serializing an
# object retains the state, or current values of all the object's
# attributes, when turning it into a string. This differs from a class
# definition because the class definition tells us what any object could
# look like, whereas a serialized object tells us what one object does
# look like. It's an important distinction.
