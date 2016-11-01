class Article < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :category
  belongs_to :country
  has_many :validations

  has_many :article_sources
  has_many :sources, through: :article_sources, :dependent => :destroy

  accepts_nested_attributes_for :sources, :reject_if=> proc { |article| article[:name].empty? || article[:source_id].empty?}

  validates :title, :content, :category, :country, presence: true
  before_save :make_title_case

  # --This custom setter method is called whenever an Article is initialized with a sources field.
  # --virtuals
  # validate :destroy_attribute
  #
  # def destroy_attribute
  #  self.sources.each do |article|
  #     if article[:name].blank?
  #       article[:name].delete
  #     end
  #   end
  # end

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
    if most_validated_article!=""
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

  def add_validation(article_id, reader)
    if reader validaiton id is the same as the article's validation's id
      Validation.new
    end
  end
    # # add a validation when user clicks button on article show page
  # def add_validation(article_id, reader)
  #
  #   # --unless the reader already validated this article_id
  #   unless Validation.find_by(user_id: reader.id)
  #
  #     # -- then find one that already exists for the article or create a new one for the article
  #     validation =  Validation.find_or_create_by(:article_id=> article_id)
  #
  #       validation.quantity += 1
  #
  #       if reader.role == "reader"
  #         self.user != reader
  #         validation.save
  #         reader.validations << validation
  #         self.validations << validation
  #         # -- user below is the reader not the author
  #         self.save
  #         reader.save
  #       end
  #
  #     end
  #
  #   end


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
