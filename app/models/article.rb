class Article < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :category
  belongs_to :country
  has_many :validations
  validates :title, :content, :category, :country, presence: true
  # attr_accessor :category_attributes
  # We want to run this whenever someone tries to save to the database. Also to make sure it saves to the databse
  # before_action :make_title_case
  # Whenever you are modifying an attribute of the model, use before_validation. If you are doing some other action, then use before_save.


  # --This custom setter method is called whenever an Article is initialized with a category_name field.
  # "virtuals"
  # def category_attributes=(title)
  #     self.category = Category.find_or_create_by(:title=> title)
  #     self.save
  # end

  def total_validations
    total = 0
    self.validations.each do |val|
      total += val.quantity
    end
    total
  end

  # add a validation when user clicks button on article show page

  def add_validation(article_id, user)
    validation =  Validation.create(:article_id=> article_id)
    if validation
      validation.quantity += 1
      if user.role == "reader"
        self.user != user
        user.validations << validation
        user.save
        validation.save
        self.validations << validation
        # -- user below is the reader not the author
        self.save
      end
    end
  end


  private
    # --callbacks are defined in the object models and called in the controller
    def is_title_case
      if title.split.any?{|w|w[0].upcase != w[0]}
       errors.add(:title, "Title must be in title case")
      end
    end

    def make_title_case
      self.title = self.title.titlecase
    end

end
