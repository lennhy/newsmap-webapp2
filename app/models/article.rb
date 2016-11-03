class Article < ApplicationRecord
  has_many :credits
  has_many :users,  -> { uniq },through: :credits
  belongs_to :category
  belongs_to :country

  has_many :article_sources
  has_many :sources, through: :article_sources, :dependent => :destroy

  validates :title, :content, :category, :country, presence: true
  before_save :make_title_case


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
       if sources_attribute[:name].blank? || sources_attribute[:source_id].blank?

       else
         source = Source.find_or_create_by(sources_attribute)
         self.sources << source
       end
     end
   end

  def total_credits
    vote_count = 0
    self.credits.each do |credit|
      vote_count += credit.vote
    end
      vote_count -1 # -- author
  end

  def add_validation(article, user)
    # check if reader validaiton.id mathces any of this article's validation's.id
    already_validated = Validation.find_by(article_id: article.id, user_id: user.id)
    # already_validated = Article.joins(:validations).where(user_id: user.id)
    if already_validated =="" ||  already_validated ==[] ||  already_validated.nil?
        new_validation = Validation.create(article_id: article.id, user_id: user.id)
        user.validations << new_validation
        user.save
        self.validations << new_validation
      else
        nil
    end
      #  article[:flash]="You have already validated this article!"

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
