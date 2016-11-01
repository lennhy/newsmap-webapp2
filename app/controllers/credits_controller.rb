class CreditsController < ApplicationController
  def create
      credit = Credit.create(credit_params)
      redirect_to user_article_path(credit.article_id), notice:"You have successfully voted for this article!"
    end

    private

    def credit_params
      params.require(:credit).permit(:vote, :article_id, :user_id, user_attributes:[:name])
    end
end
