class Article < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :category
  belongs_to :country
  has_many :validations

  has_many :article_sources
  has_many :sources
  has_many :sources, through: :article_sources, :dependent => :destroy

  accepts_nested_attributes_for :sources, :allow_destroy=> true

  validates :title, :content, :category, :sources, :country, presence: true
  before_save :make_title_case

  validate :destroy_attribute

  def destroy_attribute
   self.sources.each do |article|
      if article[:name].blank?
        article[:name].delete
      end
    end
  end
  # --This custom setter method is called whenever an Article is initialized with a sources field.
  # --virtuals

  def self.most_validated_article
    most_validated_by_quantity =0
    most_validated_article=""
    self.all.each do |article|
      article.validations.each do |validation|
        if validation.quantity > most_validated_by_quantity
            most_validated_by_quantity = validation.quantity
            most_validated_article =  Article.find(validation.article_id)
        end
      end
    end
    if !most_validated_article.empty?
      most_validated_article.title
    else
      " There are currently no articles to validate! "
    end
  end

  def sources_attributes=(sources_attributes)
     sources_attributes.values.each do |sources_attribute|
       source = Source.find_or_create_by(sources_attribute)
       self.sources << source
     end
   end

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
